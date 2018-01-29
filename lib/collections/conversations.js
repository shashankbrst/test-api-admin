import bookshelf from '../helpers/database'
import Conversation from '../models/conversation'

const Conversations = bookshelf.Collection.extend({ model: Conversation })

// This is important. Export this for all Collections. We will use it for data population.
Conversations.getRelationships = Conversation.getRelationships
Conversations.getModel = () => Conversation

export default Conversations
