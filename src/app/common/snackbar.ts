import { HttpStatusCode } from '@angular/common/http';

export const messages = {
  error: {
    login: 'You must be logged in to perform this action!',
    requestFailed: 'Something went wrong with your request, please try again later!',
    accessDenied: 'Access denied',
    notFound: 'The page or resource you are looking for does not exist!',
  },
  success: {
    register: 'You registered successfully!',
    login: 'You logged in successfully!',
    logout: 'You logged out successfully!',
    quiz: {
      create: 'Your quiz was created successfully!',
      edit: 'The quiz was edited successfully!',
      delete: 'The quiz was deleted successfully!',
    },
    admin: {
      role: {
        promoted: (role: string) => `You promoted the user to ${role} successfully!`,
        demoted: (role: string) => `You demoted the user from ${role} successfully!`,
      },
    },
  },
};

export const SNACKBAR_DURATION = 10_000;
export const snackbarErrorMessagesByStatusCode: Record<number, string> = {
  [HttpStatusCode.Unauthorized]: messages.error.login,
  [HttpStatusCode.Forbidden]: messages.error.accessDenied,
  [HttpStatusCode.NotFound]: messages.error.notFound,
};

export const snackbarAction = 'Got it';