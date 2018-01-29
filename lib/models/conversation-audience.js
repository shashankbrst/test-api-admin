import _ from 'lodash'
import bookshelf from '../helpers/database'
import Conversation from './conversation'
import Audience from './audience'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  conversation: function() {
    return this.belongsTo(Conversation)
  },
  audience: function() {
    return this.belongsTo(Audience)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'conversations_audiences',
  },
  relations,
)

const ConversationAudience = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
ConversationAudience.getRelationships = () => {
  return _.keys(relations)
}

export default ConversationAudience
