import bookshelf from '../helpers/database'
import User from '../models/user'

const Users = bookshelf.Collection.extend({ model: User })

// This is important. Export this for all Collections. We will use it for data population.
Users.getRelationships = User.getRelationships
Users.getModel = () => User

export default Users
