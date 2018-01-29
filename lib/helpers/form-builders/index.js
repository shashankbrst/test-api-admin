import _ from 'lodash'
import { Form } from 'form-builder'
import formElementsHelper from './form-elements'
import formElementTemplate from './form-element-template'

const generateActionButtons = (form, formType) => {
  return new Promise((resolve, reject) => {
    if (!form) {
      reject(new Error('Invalid Form object is passed.'))
    }

    try {
      let formMarkup = ''
      let formElementMarkup = ''
      let context = {}
      switch (formType) {
        case 'new':
          formElementMarkup = form.input('submit', { class: 'btn btn-success', value: 'Add' }).render()
          context = {
            id: 'submitNew',
            label: '',
            markup: formElementMarkup,
          }
          break
        case 'edit':
          formElementMarkup = form
            .input('submit', {
              class: 'btn btn-warning',
              value: 'Update',
            })
            .render()
          context = {
            id: 'submitEdit',
            label: '',
            markup: formElementMarkup,
          }
          break
        default:
          formElementMarkup = form
            .input('submit', {
              class: 'btn btn-default',
              value: 'Submit',
            })
            .render()
          context = {
            id: 'submit',
            label: '',
            markup: formElementMarkup,
          }
          break
      }

      formElementTemplate(context).then(formElementTemplateMarkup => {
        formMarkup += formElementTemplateMarkup

        formMarkup += form.end()

        resolve(formMarkup)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const generateForm = (collectionName, formType, formData, formErrors) => {
  return new Promise((resolve, reject) => {
    let formMarkup = ''
    const formActionBase = '/collection/' + collectionName + '/'
    const formAction = formType == 'edit' ? formActionBase + formData.id : formActionBase
    const formAttr = {
      class: 'form-horizontal',
      method: 'POST',
      action: formAction,
    }

    // Remove falsy values.
    formData = _.pickBy(formData)
    const form = Form.create(formAttr, formData)

    formMarkup += form.open()

    const formElements = formElementsHelper.resolveFormElements(collectionName)
    formElements(form, formType, formErrors)
      .then(formElementMarkup => {
        formMarkup += formElementMarkup
        return generateActionButtons(form, formType)
      })
      .then(actionButtonsMarkup => {
        formMarkup += actionButtonsMarkup
        resolve(formMarkup)
      })
      .catch(err => reject(err))
  })
}

export default { generateForm }
