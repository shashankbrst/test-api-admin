import bookshelf from '../helpers/database'
import BillingPlanOrganization from '../models/billing-plan-organization'

const BillingPlansOrganizations = bookshelf.Collection.extend({ model: BillingPlanOrganization })

// This is important. Export this for all Collections. We will use it for data population.
BillingPlansOrganizations.getRelationships = BillingPlanOrganization.getRelationships
BillingPlansOrganizations.getModel = () => BillingPlanOrganization

export default BillingPlansOrganizations
