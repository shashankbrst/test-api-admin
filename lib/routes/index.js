import controller from './controller'
import express from 'express'
import collectionRoutes from './collection'
import oauthMiddlewares from '../middlewares/oauth-middlewares'
import oauthRoutes from './oauth'

const router = express.Router()

router
  .route('/')
  .get(oauthMiddlewares.ensureAuthenticated, oauthMiddlewares.ensureSuperAdmin, controller.renderDashboard)

oauthRoutes(router)
collectionRoutes(router)

export default router
