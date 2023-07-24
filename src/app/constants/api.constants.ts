import { environment } from '../../environments/environment.development'

const root = environment.api;
const auth = `${root}/auth`;
const quiz = `${root}/quiz`;
const answer = `${root}/grade`;
const logs = `${root}/logs`;
const roles = `${root}/roles`;

export const api = {
  root,
  endpoints: {
    /**
     * Endpoints related to authentication (``api/auth``)
     */
    auth: {
      register: `${auth}/register`,
      login: `${auth}/login`,
      logout: `${auth}/logout`,
      usernameExists: (username: string) => `${auth}/username/${username}`,
      /**Endpoint to check if the user has a valid session upon app load */
      session: `${auth}/session`,
    },
    /**
     * Endpoints related to actions with quizzes (``api/quiz``)
     */
    quiz: {
      create: quiz,
      /**
       * Endpoint for retrieving a specific quiz by its id.
       * @param id 
       * @returns ``{quiz}/{id}``
       */
      id: (id: string | number) => `${quiz}/${id}`,
      edit: (id: string | number) => `${quiz}/${id}`,
      delete: (id: string | number) => `${quiz}/${id}`,
      all: `${quiz}/all`,
      search: `${quiz}/search`,
      user: (id: string) => `${quiz}/user/${id}`
    },
    answers: {
      correctAnswersInstantMode: (questionId: string) => `${answer}/${questionId}/question`,
      correctAnswersFull: (quizId: number) => `${answer}/${quizId}/quiz`,
    },
    logs: {
      getLogs: logs,
    },

    roles: {
      getUsersOfRole: (role: string) => `${roles}/users/${role}`,
      promote: (userId: string, role: string) => `${roles}/promote/${userId}/${role}`,
      demote: (userId: string, role: string) => `${roles}/demote/${userId}/${role}`,
      getUsersOfUsername: (username: string) => `${roles}/usernames/${username}`,
    }
  }
};