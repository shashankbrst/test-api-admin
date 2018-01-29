import _ from 'lodash'
import audiences from './audiences'
import conversations from './conversations'
import customerInfos from './customer-infos'
import customers from './customers'
import defaultElements from './default-elements'
import messages from './messages'
import oauthAccessTokens from './oauth-access-tokens'
import oauthAuthorizationCodes from './oauth-authorization-codes'
import oauthClients from './oauth-clients'
import oauthRefreshTokens from './oauth-refresh-tokens'
import oauthScopes from './oauth-scopes'
import organizations from './organizations'
import responses from './responses'
import templates from './templates'
import users from './users'

const formElements = {
  audiences,
  conversations,
  customerInfos,
  customers,
  defaultElements,
  messages,
  oauthAccessTokens,
  oauthAuthorizationCodes,
  oauthClients,
  oauthRefreshTokens,
  oauthScopes,
  organizations,
  responses,
  templates,
  users,
}

const getFormElementsObjectName = collectionName => _.camelCase(collectionName)

const resolveFormElements = collectionName =>
  _.get(formElements, getFormElementsObjectName(collectionName), formElements.defaultElements)

export default {
  formElements,
  getFormElementsObjectName,
  resolveFormElements,
}
