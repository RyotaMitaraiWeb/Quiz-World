export type quizSort = 'title' | 'createdOn' | 'updatedOn';
export type order = 'asc' | 'desc';

export const sorting = {
  categories: ['title', 'createdOn', 'updatedOn'] as quizSort[],
  order: ['asc', 'desc'] as order[],
};