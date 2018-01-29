import bookshelf from '../helpers/database'
import OauthScope from '../models/oauth-scope'

const OauthScopes = bookshelf.Collection.extend({ model: OauthScope })

// This is important. Export this for all Collections. We will use it for data population.
OauthScopes.getRelationships = OauthScope.getRelationships
OauthScopes.getModel = () => OauthScope

export default OauthScopes
