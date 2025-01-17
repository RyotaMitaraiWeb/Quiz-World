export const registerValidationRules = {
  username: {
    minlength: 5,
    maxlength: 15,
    pattern: /^[a-zA-Z0-9]+$/,
    UNIQUE_USERNAME_TIMEOUT: 500,
  },
  password: {
    minlength: 6,
  },
};
