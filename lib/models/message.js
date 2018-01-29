import _ from 'lodash'
import bookshelf from '../helpers/database'
import Conversation from './conversation'
import Template from './template'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  conversation: function() {
    return this.belongsTo(Conversation)
  },
  template: function() {
    return this.belongsTo(Template)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'messages',
  },
  relations,
)

const Message = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
Message.getRelationships = () => {
  return _.keys(relations)
}

export default Message
