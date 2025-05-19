export const interceptorHeaders = {
  /**
   * Attach this header to any request for which the 401 status code
   * should not redirect to the login page or display a snackbar.
   */
  SkipUnauthorizedRedirection: 'Skip-Unauthorized-Redirection',

  /**
   * Attach this header to any request for which the 403 status code
   * should not redirect to the home page
   */
  SkipForbiddenRedirection: 'Skip-Forbidden-Redirection',

  /**
   * Attach this headear to any request for which the 404 status code
   * should not redirect to the not found page.
   */
  SkipNotFoundRedirection: 'Skip-Not-Found-Redirection',
};