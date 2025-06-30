import { environment } from '../../environments/environment.development';

const root = environment.apiUrl;
const auth = `${root}/auth`;
const quiz = `${root}/quiz`;
const answer = `${root}/grade`;
const logs = `${root}/logs`;
const roles = `${root}/roles`;
const profiles = `${root}/profile`;
const images = `${root}/images`;
const profilePictures = `${images}/profile-pictures`;

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
      usernameExists: `${auth}/username`,
      /** Endpoint to check if the user has a valid session upon app load */
      session: `${auth}/session`,
      profile: (id: string) => `${auth}/${id}`,
      getProfileByUsername: (username: string) => `${auth}/get-by-username/${username}`,
    },
    /**
     * Endpoints related to actions with quizzes (``api/quiz``)
     */
    quiz: {
      create: quiz,
      browse: quiz,
      /**
       * Endpoint for retrieving a specific quiz by its id.
       * @param id
       * @returns ``{quiz}/{id}``
       */
      id: (id: string | number) => `${quiz}/${id}`,
      edit: (id: string | number) => `${quiz}/${id}`,
      delete: (id: string | number) => `${quiz}/${id}`,
      user: (id: string) => `${quiz}/user/${id}`,
      quizForEdit: (id: number) => `${quiz}/${id}/edit`,
    },
    answers: {
      correctAnswersInstantMode: (questionId: string) => `${answer}/question/${questionId}`,
      correctAnswersFull: (quizId: number) => `${answer}/quiz/${quizId}`,
    },
    logs: {
      getLogs: logs,
    },

    roles: {
      promote: `${roles}/add`,
      demote: `${roles}/remove`,
      /**
       * Use query string ``username`` to filter users.
       */
      getUsersOfUsername: () => `${roles}/users`,
    },
    profiles: {
      getByUsername: (username: string) => `${profiles}/username/${username}`,
      search: profiles,
    },
  },
  images: {
    root: images,
    profilePictures: {
      getByUsername: (username: string) => `${profilePictures}/${username}.webp`,
    },
  },
};