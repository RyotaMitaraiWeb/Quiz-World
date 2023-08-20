# RequestFailedInterceptor
An interceptor to redirect the user to the home page if the request fails

## Usage
This interceptor will redirect the user to the home page if a request returns a response with status code either zero or 500 and higher. Unlike other redirect interceptors, you cannot opt out of this one's redireciton as of yet.