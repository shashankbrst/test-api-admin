import _ from 'lodash'
import bookshelf from '../helpers/database'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {}

const modelConfig = _.merge(
  {
    tableName: 'customers',
  },
  relations,
)

const Customer = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
Customer.getRelationships = () => {
  return _.keys(relations)
}

export default Customer
