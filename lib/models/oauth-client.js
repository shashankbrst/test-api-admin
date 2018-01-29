import _ from 'lodash'
import bookshelf from '../helpers/database'
import User from './user'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  user: function() {
    return this.belongsTo(User)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'oauth_clients',
  },
  relations,
)

const OauthClient = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
OauthClient.getRelationships = () => {
  return _.keys(relations)
}

export default OauthClient
