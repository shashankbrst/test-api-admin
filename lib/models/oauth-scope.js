import _ from 'lodash'
import bookshelf from '../helpers/database'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {}

const modelConfig = _.merge(
  {
    tableName: 'oauth_scopes',
  },
  relations,
)

const OauthScope = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
OauthScope.getRelationships = () => {
  return _.keys(relations)
}

export default OauthScope
