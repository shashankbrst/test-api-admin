import _ from 'lodash'
import oauthClients from './model-data-validators/oauth-clients'
import organizations from './model-data-validators/organizations'

const modelValidators = {
  oauthClients,
  organizations,
}

const getModelValidatorObjectName = collectionName => _.camelCase(collectionName)

export default (formData, collectionName) => {
  let formErrors = {}
  let modelValidationErrors = {}

  // perform common validations.

  // perform model based validations.
  const modelValidator = _.get(modelValidators, getModelValidatorObjectName(collectionName), undefined)
  if (modelValidator != undefined) {
    const modelValidationErrors = modelValidator(formData)
    formErrors = _.merge(formErrors, modelValidationErrors)
  }

  return formErrors
}
