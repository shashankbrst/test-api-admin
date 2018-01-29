import bookshelf from '../helpers/database'
import Typelink from '../models/typelink'

const Typelinks = bookshelf.Collection.extend({ model: Typelink })

// This is important. Export this for all Collections. We will use it for data population.
Typelinks.getRelationships = Typelink.getRelationships
Typelinks.getModel = () => Typelink

export default Typelinks
