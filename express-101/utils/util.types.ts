export type StringObject = Record<string, unknown>;

export enum HttpErrorStatus {
  // Client Errors (400–499)
  BadRequest = 400, // Invalid request payload / params
  Unauthorized = 401, // Missing or invalid authentication
  PaymentRequired = 402, // Reserved, rarely used
  Forbidden = 403, // Authenticated but not allowed
  NotFound = 404, // Resource doesn’t exist
  MethodNotAllowed = 405, // Wrong HTTP method for endpoint
  Conflict = 409, // Resource conflict (e.g. duplicate)
  Gone = 410, // Resource permanently removed
  UnprocessableEntity = 422, // Validation failed
  TooManyRequests = 429, // Rate limiting

  // Server Errors (500–599)
  InternalServerError = 500, // Generic server crash / bug
  NotImplemented = 501, // Endpoint not implemented
  BadGateway = 502, // Invalid response from upstream
  ServiceUnavailable = 503, // Server overloaded or down
  GatewayTimeout = 504 // Upstream didn’t respond in time
}
