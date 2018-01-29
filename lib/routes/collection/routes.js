import _ from 'lodash'
import Collections from '../../collections'
import controller from './controller'
import express from 'express'
import collectionBuilder from '../../helpers/collection-builder'
import oauthMiddlewares from '../../middlewares/oauth-middlewares'
import omError from '../../errors/omError'
import errorCodes from '../../errors/errorCodes'

export default collectionsRouter => {
  const collectionRouter = express.Router({ mergeParams: true })
  collectionsRouter.use('/:collectionName', collectionRouter)

  collectionsRouter.param('collectionName', (req, res, next, collectionName) => {
    if (collectionBuilder.collectionExists(collectionName)) {
      if (req.path != '/' + collectionName) {
        req.breadcrumbs(_.startCase(collectionName), req.baseUrl + '/' + collectionName)
      }
      return next()
    }
    return next(new omError(errorCodes.collection_not_found))
  })

  collectionRouter.param('objectId', (req, res, next, objectId) => {
    const collectionName = req.params.collectionName
    const collection = Collections.resolveCollection(collectionName)
    const model = collection.getModel()
    model
      .where({ id: objectId })
      .fetch()
      .then(object => {
        if (object === null) {
          return next(new omError(errorCodes.object_not_found))
        }
        return next()
      })
      .catch(err => next(err))
  })

  collectionRouter
    .route('/')
    .get(oauthMiddlewares.ensureAuthenticated, oauthMiddlewares.ensureSuperAdmin, controller.renderCollectionView)
    .post(oauthMiddlewares.ensureAuthenticated, oauthMiddlewares.ensureSuperAdmin, controller.addNewObj)

  collectionRouter
    .route('/new')
    .get(oauthMiddlewares.ensureAuthenticated, oauthMiddlewares.ensureSuperAdmin, controller.renderNewView)

  collectionRouter
    .route('/queryDataTable')
    .get(oauthMiddlewares.ensureAuthenticated, oauthMiddlewares.ensureSuperAdmin, controller.queryDataTable)

  collectionRouter
    .route('/:objectId')
    .get(oauthMiddlewares.ensureAuthenticated, oauthMiddlewares.ensureSuperAdmin, controller.renderSingleView)
    .post(oauthMiddlewares.ensureAuthenticated, oauthMiddlewares.ensureSuperAdmin, controller.updateObj)
    .delete(oauthMiddlewares.ensureAuthenticated, oauthMiddlewares.ensureSuperAdmin, controller.deleteObj)
}
