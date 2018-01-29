import _ from 'lodash'
import Organization from '../../../models/organization'
import formElementTemplate from '../form-element-template'

const generateFormElements = (form, formType, formErrors, orgs, resolve, reject) => {
  if (!form) {
    reject(new Error('Invalid Form object is passed.'))
  }

  let formMarkup = ''
  let formElementMarkup = ''

  formElementMarkup = form
    .select()
    .attr({
      name: 'organization_id',
      class: 'form-control js-select2',
      'data-placeholder': 'Select Organization',
    })
    .setOptions(orgs)
    .setEmpty('Select Organization')
    .render()

  formElementTemplate({
    id: 'organization_id',
    label: 'Organization',
    markup: formElementMarkup,
    errorClass: _.has(formErrors, 'organization_id') ? 'has-error' : '',
    errorMessage: _.has(formErrors, 'organization_id') ? formErrors.organization_id : '',
  })
    .then(formElementTemplateMarkup => {
      formMarkup += formElementTemplateMarkup
      resolve(formMarkup)
    })
    .catch(err => reject(err))
}

module.exports = (form, formType, formErrors) => {
  return new Promise((resolve, reject) => {
    Organization.fetchAll()
      .then(dbOrgs => {
        const orgs = {}
        if (dbOrgs !== null) {
          _.each(dbOrgs.toJSON(), org => {
            orgs[org.id] = org.name
          })
        }
        return orgs
      })
      .then(orgs => {
        generateFormElements(form, formType, formErrors, orgs, resolve, reject)
      })
      .catch(err => reject(err))
  })
}
