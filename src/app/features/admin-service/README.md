# AdminService
An injectable service that makes HTTP calls relating to administration,
such as promoting and demoting users and obtaining logs.

Note that each method runs only if the role service's ``isAdmin``
method returns true.