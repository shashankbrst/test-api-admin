import bookshelf from '../helpers/database'
import Message from '../models/message'

const Messages = bookshelf.Collection.extend({ model: Message })

// This is important. Export this for all Collections. We will use it for data population.
Messages.getRelationships = Message.getRelationships
Messages.getModel = () => Message

export default Messages
