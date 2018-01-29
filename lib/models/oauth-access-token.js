import _ from 'lodash'
import bookshelf from '../helpers/database'
import OauthClient from './oauth-client'
import User from './user'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  oauth_client: function() {
    return this.belongsTo(OauthClient)
  },
  user: function() {
    return this.belongsTo(User)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'oauth_access_tokens',
  },
  relations,
)

const OauthAccessToken = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
OauthAccessToken.getRelationships = () => {
  return _.keys(relations)
}

export default OauthAccessToken
