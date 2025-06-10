import { role } from '../common/roles';
import { order, quizSort } from '../common/sort';

export interface SearchOptionsWithPagination {
  page?: number;
}

export interface SearchOptionsWithSorting {
  sort?: quizSort;
}

export interface SearchOptionsWithOrdering {
  order?: order;
}

export type SearchOptionsWithPaginationAndOrdering = SearchOptionsWithOrdering & SearchOptionsWithPagination;

export type SearchOptions = SearchOptionsWithOrdering & SearchOptionsWithSorting & SearchOptionsWithPagination;

export type SearchQuizParameters = Partial<{
  page: number;
  pageSize: number;
  order: order;
  sortBy: quizSort;
  author: string;
}>;

export type SearchProfilesParameters = Partial<{
  username: string;
  order: order;
  roles: role[];
  page: number;
  pageSize: number;
}>;

export type PaginatedResult<T, TKey extends string> = {
  total: number;
} & Record<TKey, T>;
