# UnauthorizedSnackbarInterceptor
An interceptor that displays a snackbar for 401 errors

## Usage
This interceptor will display an Angular Material snackbar that indicates that the user needs to be logged in to perform a certain action if the response of a request has a status code of 401. Attaching a ``Skip-Unauthorized-Redirection`` header to the request (regardless of the header's actual value) will prevent the snackbar from being displayed.