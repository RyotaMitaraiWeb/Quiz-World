import { HttpStatusCode } from '@angular/common/http';
import { role } from './roles';

export const snackbarMessages = {
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
      gradedAll: 'All questions have been graded! See below for a summary of your performance',
      gradedAllInstantMode: 'You have answered all questions! Scroll to the bottom to review your performance',
    },
    admin: {
      role: {
        promoted: (role: string) => `You promoted the user to ${role} successfully!`,
        demoted: (role: string) => `You demoted the user from ${role} successfully!`,
      },
    },
  },
  roleChanges: {
    added: (role: role) => `You have become a ${role}! Congratulations!`,
    removed: (role: role) => `You are no longer a ${role}`,
  },
};

export const SNACKBAR_DURATION = 10_000;
export const snackbarErrorMessagesByStatusCode: Record<number, string> = {
  [HttpStatusCode.Unauthorized]: snackbarMessages.error.login,
  [HttpStatusCode.Forbidden]: snackbarMessages.error.accessDenied,
  [HttpStatusCode.NotFound]: snackbarMessages.error.notFound,
};

export const snackbarAction = 'Got it';