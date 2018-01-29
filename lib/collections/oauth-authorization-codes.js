import bookshelf from '../helpers/database'
import OauthAuthorizationCode from '../models/oauth-authorization-code'

const OauthAuthorizationCodes = bookshelf.Collection.extend({ model: OauthAuthorizationCode })

// This is important. Export this for all Collections. We will use it for data population.
OauthAuthorizationCodes.getRelationships = OauthAuthorizationCode.getRelationships
OauthAuthorizationCodes.getModel = () => OauthAuthorizationCode

export default OauthAuthorizationCodes
