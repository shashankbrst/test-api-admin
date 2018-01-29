import _ from 'lodash'
import formElementTemplate from '../form-element-template'

const generateFormElements = (form, formType, formErrors, resolve, reject) => {
  if (!form) {
    reject(new Error('Invalid Form object is passed.'))
  }

  let formMarkup = ''

  let formElementMarkup = form
    .input('text', {
      name: 'id',
      class: 'form-control',
      readOnly: 'readOnly',
      placeholder: 'id (Auto-Generated)',
    })
    .render()

  formElementTemplate({
    id: 'id',
    label: 'ID',
    markup: formElementMarkup,
  })
    .then(formElementTemplateMarkup => {
      formMarkup += formElementTemplateMarkup
      resolve(formMarkup)
    })
    .catch(err => reject(err))
}

module.exports = (form, formType, formErrors) => {
  return new Promise((resolve, reject) => {
    generateFormElements(form, formType, formErrors, resolve, reject)
  })
}
