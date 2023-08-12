# NotFoundRedirectInterceptor
An interceptor to redirect the user to the not found page if a request returns 404

## Usage
This interceptor will redirect the user to the home page if a request returns a 404 response. To opt out of this behavior, attach a ``Skip-Not-Found-Redirection`` header to the request (the value itself doesn't matter, the interceptor only looks for the presence of the header). An exported constant with the header string is available from the same file as the interceptor class.