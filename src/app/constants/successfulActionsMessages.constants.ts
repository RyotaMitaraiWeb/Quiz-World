export const successfulActionsMessages = {
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
    }
  }
}