import bookshelf from '../helpers/database'
import IsMuted from '../models/is-muted'

const AreMuted = bookshelf.Collection.extend({ model: IsMuted })

// This is important. Export this for all Collections. We will use it for data population.
AreMuted.getRelationships = IsMuted.getRelationships
AreMuted.getModel = () => IsMuted

export default AreMuted
