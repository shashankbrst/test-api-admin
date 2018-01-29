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

    formElementMarkup = form
      .text()
      .attr({
        name: 'description',
        class: 'form-control',
        placeholder: 'Description',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'description',
      label: 'Description',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'description') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'description') ? formErrors.description : '',
    })

    formElementMarkup = form
      .text()
      .attr({
        name: 'logo',
        class: 'form-control',
        placeholder: 'Logo',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'logo',
      label: 'Logo',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'logo') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'logo') ? formErrors.logo : '',
    })

    formElementMarkup = form
      .text()
      .attr({
        name: 'phone_number',
        class: 'form-control',
        placeholder: 'Phone Number',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'phone_number',
      label: 'Phone Number',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'phone_number') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'phone_number') ? formErrors.phone_number : '',
    })

    formElementMarkup = form
      .text()
      .attr({
        name: 'email_address',
        class: 'form-control',
        placeholder: 'Email',
      })
      .render()
    formMarkup += await formElementTemplate({
      id: 'email_address',
      label: 'Email',
      markup: formElementMarkup,
      errorClass: _.has(formErrors, 'email_address') ? 'has-error' : '',
      errorMessage: _.has(formErrors, 'email_address') ? formErrors.email_address : '',
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
