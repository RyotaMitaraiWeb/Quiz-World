# ForbiddenRedirectInterceptor
An interceptor to redirect the user to the home page if a request returns 403

## Usage
This interceptor will redirect the user to the home page if a request returns a 403 response. To opt out of this behavior, attach a ``Skip-Forbidden-Redirection`` header to the request (the value itself doesn't matter, the interceptor only looks for the presence of the header).