import { isValid } from '../../utils'

export default formData => {
  const formErrors = {}

  if (!isValid(formData.name)) formErrors.name = 'Name is required'
  if (!isValid(formData.redirect_uris)) formErrors.redirect_uris = 'Redirect URI is required'
  if (!isValid(formData.grants)) formErrors.grants = 'Grant is required'
  if (!isValid(formData.scope)) formErrors.scope = 'Scope is required'
  if (!isValid(formData.user_id)) formErrors.user_id = 'User is required'

  return formErrors
}
