import bookshelf from '../helpers/database'
import Audience from '../models/audience'

const Audiences = bookshelf.Collection.extend({ model: Audience })

// This is important. Export this for all Collections. We will use it for data population.
Audiences.getRelationships = Audience.getRelationships
Audiences.getModel = () => Audience

export default Audiences
