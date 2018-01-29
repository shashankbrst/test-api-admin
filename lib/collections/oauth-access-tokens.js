import bookshelf from '../helpers/database'
import OauthAccessToken from '../models/oauth-access-token'

const OauthAccessTokens = bookshelf.Collection.extend({ model: OauthAccessToken })

// This is important. Export this for all Collections. We will use it for data population.
OauthAccessTokens.getRelationships = OauthAccessToken.getRelationships
OauthAccessTokens.getModel = () => OauthAccessToken

export default OauthAccessTokens
