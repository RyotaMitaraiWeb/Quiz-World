import { registerValidationRules } from "../validationRules/register";

export const registerErrorMessages = {
  username: {
    minlength: `The username should be at least ${registerValidationRules.username.minlength} characters long`,
    maxlength: `The username should be no longer than ${registerValidationRules.username.maxlength} characters long`,
    pattern: 'The username can only contain letters and numbers',
    required: 'Please fill in a username',
  },
  password: {
    minlength: `The password must be at least ${registerValidationRules.password.minlength} characters long`,
    required: 'Please fill in a password',
  },
};
