import _ from 'lodash'
import AreMuted from './are-muted'
import Audiences from './audiences'
import BillingPlans from './billing-plans'
import BillingPlansOrganizations from './billing-plans-organizations'
import Conversations from './conversations'
import ConversationsAudiences from './conversations-audiences'
import CustomerInfos from './customer-infos'
import Customers from './customers'
import CustomersAudiences from './customers-audiences'
import CustomersMessages from './customers-messages'
import Messages from './messages'
import OauthAccessTokens from './oauth-access-tokens'
import OauthAuthorizationCodes from './oauth-authorization-codes'
import OauthClients from './oauth-clients'
import OauthRefreshTokens from './oauth-refresh-tokens'
import OauthScopes from './oauth-scopes'
import Organizations from './organizations'
import Responses from './responses'
import Templates from './templates'
import Typelinks from './typelinks'
import Users from './users'

const collections = {
  AreMuted,
  Audiences,
  BillingPlans,
  BillingPlansOrganizations,
  Conversations,
  ConversationsAudiences,
  CustomerInfos,
  Customers,
  CustomersAudiences,
  CustomersMessages,
  Messages,
  OauthAccessTokens,
  OauthAuthorizationCodes,
  OauthClients,
  OauthRefreshTokens,
  OauthScopes,
  Organizations,
  Responses,
  Templates,
  Typelinks,
  Users,
}

const getCollectionName = string => _.kebabCase(string)

const getCollectionObjectName = collectionName => _.upperFirst(_.camelCase(collectionName))

const resolveCollection = collectionName => {
  return _.get(collections, getCollectionObjectName(collectionName), undefined)
}

export default {
  collections,
  getCollectionName,
  getCollectionObjectName,
  resolveCollection,
}
