import _ from 'lodash'
import crypto from 'crypto'

export default (data, isEdit) => {
  if (!isEdit) {
    data.client_id = crypto
      .createHash('md5')
      .update(crypto.randomBytes(16))
      .digest('hex') // 32 chars
    data.client_secret = crypto
      .createHash('sha256')
      .update(crypto.randomBytes(32))
      .digest('hex') // 64 chars
  }

  data.grants = _.join(data.grants, ',')

  return data
}
