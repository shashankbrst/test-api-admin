import _ from 'lodash'
import bookshelf from '../helpers/database'
import Customer from './customer'
import Audience from './audience'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  customer: function() {
    return this.belongsTo(Customer)
  },
  audience: function() {
    return this.belongsTo(Audience)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'customers_audiences',
  },
  relations,
)

const CustomerAudience = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
CustomerAudience.getRelationships = () => {
  return _.keys(relations)
}

export default CustomerAudience
