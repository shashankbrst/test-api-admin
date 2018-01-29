import _ from 'lodash'
import oauthClients from './model-data-sanitizers/oauth-clients'

const modelDataSanitizers = {
  oauthClients,
}

const getModelSanitizerObjectName = collectionName => _.camelCase(collectionName)

export default (data, collectionName, isEdit) => {
  // perform common sanitization.

  // perform model based sanitization.
  const modelDataSanitizer = _.get(modelDataSanitizers, getModelSanitizerObjectName(collectionName), undefined)
  if (modelDataSanitizer != undefined) {
    data = modelDataSanitizer(data, isEdit)
  }

  return data
}
