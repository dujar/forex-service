export enum ScoopErrors {
  'SUCCESS' = '200', // Success Everything went smooth.
  'UNAUTHORIZED' = '401', // Unauthorized Missing or incorrect API token in header.
  'UNPROCESSABLE' = '422', // Unprocessable Entity meaning something with the message isn’t quite right, this could be malformed JSON or incorrect fields. In this case, the response body contains JSON with an API error code and message containing details on what went wrong.
  'INTERNAL_SERVER_ERROR' = '500', // Internal Server Error This is an issue with Currencyscoop's servers processing your request. In most cases the message is lost during the process, and we are notified so that we can investigate the issue.
  'SERVICE_UNAVAILABLE' = '503', // Service Unavailable During planned service outages, Currencyscoop API services will return this HTTP response and associated JSON body.
  'API_LIMIT' = '429', // Too many requests. API limits reached.
}
