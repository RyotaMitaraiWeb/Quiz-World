# TokenInterceptor
An interceptor to attach JWTs to requests.

## Usage
This interceptor will take the JWT stored in ``localStorage``'s ``token`` field and attach it to the request's ``Authorization`` header as ``Bearer {token}``. If there is no such field, no header is attached.