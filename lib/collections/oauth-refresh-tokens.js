import bookshelf from '../helpers/database'
import OauthRefreshToken from '../models/oauth-refresh-token'

const OauthRefreshTokens = bookshelf.Collection.extend({ model: OauthRefreshToken })

// This is important. Export this for all Collections. We will use it for data population.
OauthRefreshTokens.getRelationships = OauthRefreshToken.getRelationships
OauthRefreshTokens.getModel = () => OauthRefreshToken

export default OauthRefreshTokens
