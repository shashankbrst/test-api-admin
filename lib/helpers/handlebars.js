import _ from 'lodash'
import hbs from 'express-handlebars'
import hbsHelpers from 'handlebars-helpers'
import path from 'path'

const isActive = (currentPath, linkPath) => (currentPath === linkPath ? 'active' : '')

const isActiveCollection = (currentPath, collectionName) =>
  currentPath === '/collection/' + collectionName ? 'active' : ''

const helpers = { isActive, isActiveCollection }

const instance = hbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '..', 'views/layouts'),
  partialsDir: path.join(__dirname, '..', 'views/partials'),
  helpers: _.merge(helpers, hbsHelpers()),
})

export default {
  instance,
  helpers,
}
