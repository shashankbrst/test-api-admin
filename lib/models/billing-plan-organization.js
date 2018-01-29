import _ from 'lodash'
import bookshelf from '../helpers/database'
import BillingPlan from './billing-plan'
import Organization from './organization'

// DO NOT use => arrow function below. It will mess up the `this` context.
const relations = {
  billing_plan: function() {
    return this.belongsTo(BillingPlan)
  },
  organization: function() {
    return this.belongsTo(Organization)
  },
}

const modelConfig = _.merge(
  {
    tableName: 'billing_plans_organizations',
  },
  relations,
)

const BillingPlanOrganization = bookshelf.Model.extend(modelConfig)

// This is important. Export this for all Models. We will use it for data population.
BillingPlanOrganization.getRelationships = () => {
  return _.keys(relations)
}

export default BillingPlanOrganization
