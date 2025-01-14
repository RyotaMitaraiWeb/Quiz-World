export type sort = 'title' | 'createdOn' | 'updatedOn';
export type order = 'asc' | 'desc';

export const sorting = {
  categories: ['title', 'createdOn', 'updatedOn'] as sort[],
  order: ['asc', 'desc'] as order[],
};