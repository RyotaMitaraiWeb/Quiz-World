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

export type PaginatedResult<T, TKey extends string> = {
  total: number;
} & Record<TKey, T>;
