import { environment } from '../../environments/environment.development'

const root = environment.api;
const auth = `${root}/auth`;
const quiz = `${root}/quiz`;

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
      /**Endpoint to check if the user has a valid session upon app load */
      session: auth,
    },
    /**
     * Endpoints related to actions with quizzes (``api/quiz``)
     */
    quiz: {
      create: `${quiz}/create`,
      /**
       * Endpoint for retrieving a specific quiz by its id.
       * @param id 
       * @returns ``{quiz}/{id}``
       */
      id: (id: string | number) => `${quiz}/${id}`,
      edit: (id: string | number) => `${quiz}/${id}`,
      delete: (id: string | number) => `${quiz}/${id}`,
      all: `${quiz}/all`,
    }
  }
};