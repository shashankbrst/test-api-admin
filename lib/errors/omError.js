import errorCodes from './errorCodes'

export default class omError extends Error {
  constructor(error = errorCodes.JAKE, details = {}) {
    super(error.message)
    this.message = error.message
    this.code = error.code
    this.status = error.status
    this.source = error.source
    this.details = details
  }

  toString() {
    return JSON.stringify(this.toJSON(), null, '\t')
  }

  toJSON() {
    const curErr = {
      message: this.message,
      code: this.code,
      status: this.status,
      source: this.source,
      details: this.details,
    }

    return {
      errors: curErr,
    }
  }
}
