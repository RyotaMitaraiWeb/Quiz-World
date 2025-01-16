export const registerValidationRules = {
  username: {
    minlength: 5,
    maxlength: 15,
    pattern: /^[a-zA-Z0-9]+$/,
  },
  password: {
    minlength: 6,
  },
};
