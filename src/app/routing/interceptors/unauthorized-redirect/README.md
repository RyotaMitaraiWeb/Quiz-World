# UnauthorizedRedirectInterceptor
An interceptor to redirect to the login page if the request returns a 401 response.

## Usage
This interceptor will redirect the user to the login page if a request returns a 401 response and delete their ``token`` in the ``localStorage``. To opt out of this behavior, attach a ``Skip-Unauthorized-Redirection`` header to the request (the value itself doesn't matter, the interceptor only looks for the presence of the header). An exported constant with the header string is available from the same file as the interceptor class.