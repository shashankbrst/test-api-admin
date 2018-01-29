import { isValid } from '../../utils'

export default formData => {
  const formErrors = {}

  if (!isValid(formData.name)) formErrors.name = 'Name is required'
  if (!isValid(formData.street1)) formErrors.street1 = 'Street Address 1 is required'
  if (!isValid(formData.city)) formErrors.city = 'City is required'
  if (!isValid(formData.state)) formErrors.state = 'State is required'
  if (!isValid(formData.country)) formErrors.country = 'Country is required'
  if (!isValid(formData.zip)) formErrors.zip = 'Zip Code is required'

  return formErrors
}
