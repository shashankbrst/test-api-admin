/**
 * Created by udit on 9/29/17.
 */

import express from 'express'
import routes from './routes'

export default parentRouter => {
  const oauth = express.Router()

  parentRouter.use('/oauth', oauth)

  routes(oauth)
}
