import _ from 'lodash'
import bookshelf from '../helpers/database'
import Customer from './customer'
import Message from './message'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  customer: function() {
    return this.belongsTo(Customer)
  },
  message: function() {
    return this.belongsTo(Message)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'customers_messages',
  },
  relations,
)

const CustomerMessage = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
CustomerMessage.getRelationships = () => {
  return _.keys(relations)
}

export default CustomerMessage
