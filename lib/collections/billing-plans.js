import bookshelf from '../helpers/database'
import BillingPlan from '../models/billing-plan'

const BillingPlans = bookshelf.Collection.extend({ model: BillingPlan })

// This is important. Export this for all Collections. We will use it for data population.
BillingPlans.getRelationships = BillingPlan.getRelationships
BillingPlans.getModel = () => BillingPlan

export default BillingPlans
