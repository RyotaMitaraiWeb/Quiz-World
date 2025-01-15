import { order, quizSort } from "../common/sort";

export type SearchOptionsWithPagination = {
  page?: number;
};

export type SearchOptionsWithSorting = {
  sort?: quizSort;
};

export type SearchOptionsWithOrdering = {
  order?: order;
};

export type SearchOptionsWithPaginationAndOrdering = SearchOptionsWithOrdering & SearchOptionsWithPagination;

export type SearchOptions = SearchOptionsWithOrdering & SearchOptionsWithSorting & SearchOptionsWithPagination;