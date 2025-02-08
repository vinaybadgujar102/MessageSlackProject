export const internalServerError = (error: any) => {
  return {
    success: false,
    err: error,
    data: {},
    message: 'Internal server error'
  }
}

export const customErrorResponse = (error: any) => {
  if (!error.message && !error.explaination) {
    return internalServerError(error)
  }
  return {
    success: false,
    err: error.explaination,
    data: {},
    message: error.message
  }
}

export const successResponse = (data: any, message: string) => {
  return {
    success: true,
    data,
    message,
    err: {}
  }
}
