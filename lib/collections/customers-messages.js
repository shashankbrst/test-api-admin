import bookshelf from '../helpers/database'
import CustomerMessage from '../models/customer-message'

const CustomersMessages = bookshelf.Collection.extend({ model: CustomerMessage })

// This is important. Export this for all Collections. We will use it for data population.
CustomersMessages.getRelationships = CustomerMessage.getRelationships
CustomersMessages.getModel = () => CustomerMessage

export default CustomersMessages
