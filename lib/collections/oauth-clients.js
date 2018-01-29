import bookshelf from '../helpers/database'
import OauthClient from '../models/oauth-client'

const OauthClients = bookshelf.Collection.extend({ model: OauthClient })

// This is important. Export this for all Collections. We will use it for data population.
OauthClients.getRelationships = OauthClient.getRelationships
OauthClients.getModel = () => OauthClient

export default OauthClients
