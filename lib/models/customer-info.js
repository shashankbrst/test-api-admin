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
    tableName: 'customer_infos',
  },
  relations,
)

const CustomerInfo = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
CustomerInfo.getRelationships = () => {
  return _.keys(relations)
}

export default CustomerInfo
