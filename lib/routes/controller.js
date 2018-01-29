import collectionBuilder from '../helpers/collection-builder'
import moment from 'moment'

const renderDashboard = (req, res) => {
  const collections = collectionBuilder.getCollections()
  res.render('dashboard', {
    title: 'Dashboard',
    subTitle: 'To show widgets / analytics etc.',
    collections: collections,
    user: req.user,
    currentYear: moment().year(),
    currentPath: req.path,
    breadcrumbs: req.breadcrumbs(),
  })
}

export default { renderDashboard }
