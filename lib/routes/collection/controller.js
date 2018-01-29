import _ from 'lodash'
import Models from '../../models'
import Collections from '../../collections'
import bookshelf from '../../helpers/database'
import dataSanitizer from '../../helpers/data-sanitizers'
import formBuilder from '../../helpers/form-builders'
import formValidator from '../../helpers/form-validators'
import collectionBuilder from '../../helpers/collection-builder'
import moment from 'moment'
import pageMaker from 'bookshelf-pagemaker'
import pluralize from 'pluralize'
import omError from '../../errors/omError'
import errorCodes from '../../errors/errorCodes'

const renderCollectionView = (req, res) => {
  const collections = collectionBuilder.getCollections()
  const collectionName = req.params.collectionName
  req.breadcrumbs(_.startCase(collectionName))
  res.render('collection-view', {
    title: _.startCase(collectionName),
    subTitle: 'List of all ' + pluralize(_.startCase(collectionName)),
    collections: collections,
    user: req.user,
    collectionName: collectionName,
    currentYear: moment().year(),
    currentPath: req.baseUrl,
    breadcrumbs: req.breadcrumbs(),
  })
}

const addNewObj = (req, res, next) => {
  const collections = collectionBuilder.getCollections()
  const collectionName = req.params.collectionName
  const collection = Collections.resolveCollection(collectionName)
  const model = collection.getModel()
  const body = req.body

  const formErrors = formValidator(body, collectionName)

  if (_.isEmpty(formErrors)) {
    const sanitizedBody = dataSanitizer(body, collectionName, false)

    new model(sanitizedBody)
      .save()
      .then(newObject => {
        res.redirect('/collection/' + collectionName + '/' + newObject.id)
      })
      .catch(err => {
        formBuilder
          .generateForm(collectionName, 'new', body)
          .then(objectForm => {
            res.render('new-view', {
              title: _.startCase(collectionName),
              subTitle: 'Add New',
              errorMessage: err.message,
              collections: collections,
              user: req.user,
              objectForm: objectForm,
              currentYear: moment().year(),
              currentPath: req.baseUrl,
              breadcrumbs: req.breadcrumbs(),
            })
          })
          .catch(err => next(err))
      })
  } else {
    formBuilder
      .generateForm(collectionName, 'new', body, formErrors)
      .then(objectForm => {
        res.render('new-view', {
          title: _.startCase(collectionName),
          subTitle: 'Add New',
          collections: collections,
          user: req.user,
          objectForm: objectForm,
          currentYear: moment().year(),
          currentPath: req.baseUrl,
          breadcrumbs: req.breadcrumbs(),
        })
      })
      .catch(err => next(err))
  }
}

const queryDataTable = (req, res, next) => {
  const collectionName = req.params.collectionName
  const collection = Collections.resolveCollection(collectionName)
  const pm = pageMaker(bookshelf)
  const withRelated = collection.getRelationships()
  const queryPaginateParams = {
    request: req,
    withRelated,
  }
  pm(collection.getModel(), 'datatables')
    .forge()
    .query(qb => {
      qb.orderBy('id', 'desc')
    })
    .paginate(queryPaginateParams)
    .end()
    .then(results => {
      res.send(results)
    })
    .catch(err => next(err))
}

const renderNewView = (req, res, next) => {
  const collections = collectionBuilder.getCollections()
  const collectionName = req.params.collectionName
  req.breadcrumbs('New')
  formBuilder
    .generateForm(collectionName, 'new')
    .then(objectForm => {
      res.render('new-view', {
        title: _.startCase(collectionName),
        subTitle: 'Add New',
        collections: collections,
        user: req.user,
        objectForm: objectForm,
        currentYear: moment().year(),
        currentPath: req.baseUrl,
        breadcrumbs: req.breadcrumbs(),
      })
    })
    .catch(err => next(err))
}

const renderSingleView = (req, res, next) => {
  const collections = collectionBuilder.getCollections()
  const collectionName = req.params.collectionName
  const objectId = req.params.objectId
  const collection = Collections.resolveCollection(collectionName)
  const model = collection.getModel()

  req.breadcrumbs(objectId)

  const updated = req.query.updated ? true : false
  let successMessage = ''
  if (updated) {
    successMessage = 'Updated successfully.'
  }

  model
    .where({ id: objectId })
    .fetch()
    .then(object => {
      if (object == null) {
        return next(new omError(errorCodes.object_not_found))
      }
      formBuilder
        .generateForm(collectionName, 'edit', object.toJSON())
        .then(objectForm => {
          res.render('single-view', {
            successMessage: successMessage,
            collections: collections,
            title: _.startCase(collectionName),
            subTitle: 'ID: ' + objectId,
            user: req.user,
            collectionName: collectionName,
            objectForm: objectForm,
            currentYear: moment().year(),
            currentPath: req.baseUrl,
            breadcrumbs: req.breadcrumbs(),
          })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

const updateObj = (req, res, next) => {
  const collections = collectionBuilder.getCollections()
  const collectionName = req.params.collectionName
  const collection = Collections.resolveCollection(collectionName)
  const model = collection.getModel()
  const body = req.body
  const objectId = req.params.objectId

  const formErrors = formValidator(body, collectionName)

  if (_.isEmpty(formErrors)) {
    const sanitizedBody = dataSanitizer(body, collectionName, true)

    new model({ id: objectId })
      .save(sanitizedBody)
      .then(updatedObj => {
        res.redirect('/collection/' + collectionName + '/' + updatedObj.id + '/?updated=1')
      })
      .catch(err => {
        formBuilder
          .generateForm(collectionName, 'new', body)
          .then(objectForm => {
            res.render('single-view', {
              errorMessage: err.message,
              collections: collections,
              title: _.startCase(collectionName),
              subTitle: 'ID: ' + objectId,
              user: req.user,
              objectForm: objectForm,
              currentYear: moment().year(),
              currentPath: req.baseUrl,
              breadcrumbs: req.breadcrumbs(),
            })
          })
          .catch(err => next(err))
      })
  } else {
    formBuilder
      .generateForm(collectionName, 'new', body, formErrors)
      .then(objectForm => {
        res.render('single-view', {
          collections: collections,
          title: _.startCase(collectionName),
          subTitle: 'ID: ' + objectId,
          user: req.user,
          objectForm: objectForm,
          currentYear: moment().year(),
          currentPath: req.baseUrl,
          breadcrumbs: req.breadcrumbs(),
        })
      })
      .catch(err => next(err))
  }
}

const deleteObj = (req, res, next) => {
  const collectionName = req.params.collectionName
  const objectId = req.params.objectId
  const collection = Collections.resolveCollection(collectionName)
  const model = collection.getModel()

  new model({ id: objectId })
    .destroy()
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => next(err))
}

export default {
  renderCollectionView,
  addNewObj,
  queryDataTable,
  renderNewView,
  renderSingleView,
  updateObj,
  deleteObj,
}
