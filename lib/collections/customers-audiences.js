import bookshelf from '../helpers/database'
import CustomerAudience from '../models/customer-audience'

const CustomersAudiences = bookshelf.Collection.extend({ model: CustomerAudience })

// This is important. Export this for all Collections. We will use it for data population.
CustomersAudiences.getRelationships = CustomerAudience.getRelationships
CustomersAudiences.getModel = () => CustomerAudience

export default CustomersAudiences
