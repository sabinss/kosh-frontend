// The server's error body: { "errors": [{ "message": "...", "field"?: "..." }] }
export type ApiFieldError = {
  message: string
  field?: string
}

// Thrown by apiRequest whenever the server answers with a non-2xx status.
// Components can check `error instanceof ApiError` to show the server's message.
export class ApiError extends Error {
  status: number
  errors: ApiFieldError[]

  constructor(status: number, errors: ApiFieldError[]) {
    super(errors[0]?.message ?? 'Something went wrong')
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }

  static fromResponse(status: number, body: unknown): ApiError {
    if (
      typeof body === 'object' &&
      body !== null &&
      'errors' in body &&
      Array.isArray(body.errors)
    ) {
      return new ApiError(status, body.errors as ApiFieldError[])
    }
    return new ApiError(status, [{ message: 'Something went wrong' }])
  }
}
