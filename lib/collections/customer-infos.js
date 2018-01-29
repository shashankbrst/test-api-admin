import bookshelf from '../helpers/database'
import CustomerInfo from '../models/customer-info'

const CustomerInfos = bookshelf.Collection.extend({ model: CustomerInfo })

// This is important. Export this for all Collections. We will use it for data population.
CustomerInfos.getRelationships = CustomerInfo.getRelationships
CustomerInfos.getModel = () => CustomerInfo

export default CustomerInfos
