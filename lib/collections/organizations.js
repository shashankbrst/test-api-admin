import bookshelf from '../helpers/database'
import Organization from '../models/organization'

const Organizations = bookshelf.Collection.extend({ model: Organization })

// This is important. Export this for all Collections. We will use it for data population.
Organizations.getRelationships = Organization.getRelationships
Organizations.getModel = () => Organization

export default Organizations
