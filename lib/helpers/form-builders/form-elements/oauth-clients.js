import _ from 'lodash'
import formElementTemplate from '../form-element-template'
import User from '../../../models/user'
import omEnums from '../../../config/om-enums'

const generateFormElements = async (form, formType, formErrors, users, resolve, reject) => {
  if (!form) {
    reject(new Error('Invalid Form object is passed.'))
  }

  try {
    // ref object id is converted to string.
    // So that select element value is matched properly.
    const formData = form.getFormData()
    if (formData && formData.grants) {
      formData.grants = formData.grants.split(',')
      form.setFormData(formData)
    }

    let formMarkup = ''
    let formElementMarkup = ''

    formElementMarkup = form
      .text()
      .attr({
        name: 'name',
        class: 'form-control',
        placeholder: 'Name',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'name',
      label: 'Name',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'name') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'name') ? formErrors.name : '',
    })

    if (formType == 'edit') {
      formMarkup += await formElementTemplate({
        id: 'client_id',
        label: 'Client ID',
        markup: '<code>' + form.getFormData().client_id + '</code>',
        errorClass: '',
        errorMessage: '',
      })

      formMarkup += await formElementTemplate({
        id: 'client_secret',
        label: 'Client Secret',
        markup: '<code>' + form.getFormData().client_secret + '</code>',
        errorClass: '',
        errorMessage: '',
      })
    }

    formElementMarkup = form
      .textarea()
      .attr({
        name: 'redirect_uris',
        class: 'form-control',
        placeholder: 'Redirect URIs (Comma Seperated)',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'redirect_uris',
      label: 'Redirect URIs',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'redirect_uris') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'redirect_uris') ? formErrors.redirect_uris : '',
    })

    formElementMarkup = form
      .select()
      .attr({
        name: 'grants[]',
        class: 'form-control js-select2',
        multiple: true,
        'data-placeholder': 'Select Grants',
      })
      .setOptions(
        _.reduce(
          omEnums.oauth.grants,
          (hash, value) => {
            hash[value] = _.startCase(value)
            return hash
          },
          {},
        ),
      )
      .render()
    formMarkup += await formElementTemplate({
      id: 'grants',
      label: 'Grants',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'grants') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'grants') ? formErrors.grants : '',
    })

    formElementMarkup = form
      .text()
      .attr({
        name: 'scope',
        class: 'form-control',
        placeholder: 'Scope',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'scope',
      label: 'Scope',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'scope') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'scope') ? formErrors.scope : '',
    })

    formElementMarkup = form
      .select()
      .attr({
        name: 'user_id',
        class: 'form-control js-select2',
      })
      .setOptions(users)
      .setEmpty('Select User')
      .render()
    formMarkup += await formElementTemplate({
      id: 'user_id',
      label: 'User',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'user_id') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'user_id') ? formErrors.user_id : '',
    })

    resolve(formMarkup)
  } catch (err) {
    reject(err)
  }
}

module.exports = (form, formType, formErrors) => {
  return new Promise((resolve, reject) => {
    User.fetchAll()
      .then(dbUsers => {
        const users = {}
        if (dbUsers != null) {
          _.each(dbUsers.toJSON(), user => {
            users[user.id] = user.display_name + ' [' + user.email_address + ']'
          })
        }
        return users
      })
      .then(users => {
        generateFormElements(form, formType, formErrors, users, resolve, reject)
      })
      .catch(err => reject(err))
  })
}
