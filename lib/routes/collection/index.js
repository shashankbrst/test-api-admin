/**
 * Created by udit on 10/25/17.
 */

import express from 'express'
import routes from './routes'

export default parentRouter => {
  const collection = express.Router()

  parentRouter.use('/collection', collection)

  routes(collection)
}
