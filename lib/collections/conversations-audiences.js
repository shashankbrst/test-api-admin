import bookshelf from '../helpers/database'
import ConversationAudience from '../models/conversation-audience'

const ConversationsAudiences = bookshelf.Collection.extend({ model: ConversationAudience })

// This is important. Export this for all Collections. We will use it for data population.
ConversationsAudiences.getRelationships = ConversationAudience.getRelationships
ConversationsAudiences.getModel = () => ConversationAudience

export default ConversationsAudiences
