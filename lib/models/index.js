import _ from 'lodash'
import Audience from './audience'
import BillingPlan from './billing-plan'
import BillingPlanOrganization from './billing-plan-organization'
import Conversation from './conversation'
import ConversationAudience from './conversation-audience'
import CustomerInfo from './customer-info'
import Customer from './customer'
import CustomerAudience from './customer-audience'
import CustomerMessage from './customer-message'
import IsMuted from './is-muted'
import Message from './message'
import OauthAccessToken from './oauth-access-token'
import OauthAuthorizationCode from './oauth-authorization-code'
import OauthClient from './oauth-client'
import OauthRefreshToken from './oauth-refresh-token'
import OauthScope from './oauth-scope'
import Organization from './organization'
import Response from './response'
import Template from './template'
import Typelink from './typelink'
import User from './user'

const models = {
  Audience,
  BillingPlan,
  BillingPlanOrganization,
  Conversation,
  ConversationAudience,
  CustomerInfo,
  Customer,
  CustomerAudience,
  CustomerMessage,
  IsMuted,
  Message,
  OauthAccessToken,
  OauthAuthorizationCode,
  OauthClient,
  OauthRefreshToken,
  OauthScope,
  Organization,
  Response,
  Template,
  Typelink,
  User,
}

const getModelName = string => _.kebabCase(string)

const getModelObjectName = modelName => _.upperFirst(_.camelCase(modelName))

const resolveModel = modelName => {
  return _.get(models, getModelObjectName(modelName), undefined)
}

export default {
  models,
  getModelName,
  getModelObjectName,
  resolveModel,
}
