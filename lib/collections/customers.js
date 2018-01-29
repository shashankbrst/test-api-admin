import bookshelf from '../helpers/database'
import Customer from '../models/customer'

const Customers = bookshelf.Collection.extend({ model: Customer })

// This is important. Export this for all Collections. We will use it for data population.
Customers.getRelationships = Customer.getRelationships
Customers.getModel = () => Customer

export default Customers
