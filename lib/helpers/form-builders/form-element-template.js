import hbs from '../handlebars'

const getFormElement = context => {
  return new Promise((resolve, reject) => {
    hbs.instance
      .getPartials()
      .then(partials => {
        const formElementTemplate = partials['form-builders/form-element']
        const markup = formElementTemplate(context)
        resolve(markup)
      })
      .catch(err => reject(err))
  })
}

export default getFormElement
