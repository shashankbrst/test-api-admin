import bookshelf from '../helpers/database'
import Template from '../models/template'

const Templates = bookshelf.Collection.extend({ model: Template })

// This is important. Export this for all Collections. We will use it for data population.
Templates.getRelationships = Template.getRelationships
Templates.getModel = () => Template

export default Templates
