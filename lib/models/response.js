import _ from 'lodash'
import bookshelf from '../helpers/database'
import Message from './message'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  message: function() {
    return this.belongsTo(Message)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'responses',
  },
  relations,
)

const Response = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
Response.getRelationships = () => {
  return _.keys(relations)
}

export default Response
