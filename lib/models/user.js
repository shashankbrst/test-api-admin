import _ from 'lodash'
import bookshelf from '../helpers/database'
import Organization from './organization'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  organization: function() {
    return this.belongsTo(Organization)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'users',
    hasSecurePassword: true,
  },
  relations,
)

const User = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
User.getRelationships = () => {
  return _.keys(relations)
}

export default User
