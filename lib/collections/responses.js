import bookshelf from '../helpers/database'
import Response from '../models/response'

const Responses = bookshelf.Collection.extend({ model: Response })

// This is important. Export this for all Collections. We will use it for data population.
Responses.getRelationships = Response.getRelationships
Responses.getModel = () => Response

export default Responses
