import _ from 'lodash'
import formElementTemplate from '../form-element-template'

const generateFormElements = async (form, formType, formErrors, resolve, reject) => {
  if (!form) {
    reject(new Error('Invalid Form object is passed.'))
  }

  try {
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

    formElementMarkup = form
      .text()
      .attr({
        name: 'category',
        class: 'form-control',
        placeholder: 'Category',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'category',
      label: 'Category',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'category') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'category') ? formErrors.category : '',
    })

    formElementMarkup = form
      .textarea()
      .attr({
        name: 'markup',
        class: 'form-control',
        placeholder: 'Markup',
        rows: '4',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'markup',
      label: 'Markup',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'markup') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'markup') ? formErrors.markup : '',
    })

    formElementMarkup = form
      .text()
      .attr({
        name: 'type',
        class: 'form-control',
        placeholder: 'Type',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'type',
      label: 'Type',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'type') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'type') ? formErrors.type : '',
    })

    resolve(formMarkup)
  } catch (err) {
    reject(err)
  }
}

module.exports = (form, formType, formErrors) => {
  return new Promise((resolve, reject) => {
    generateFormElements(form, formType, formErrors, resolve, reject)
  })
}
