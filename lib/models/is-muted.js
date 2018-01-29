import _ from 'lodash'
import bookshelf from '../helpers/database'
import Customer from './customer'
import Organization from './organization'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  customer: function() {
    return this.belongsTo(Customer)
  },
  organization: function() {
    return this.belongsTo(Organization)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'is_muted',
  },
  relations,
)

const IsMuted = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
IsMuted.getRelationships = () => {
  return _.keys(relations)
}

export default IsMuted
