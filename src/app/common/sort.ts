export type quizSort = 'title' | 'createdOn' | 'updatedOn';
export type order = 'asc' | 'desc';

export interface SortAndOrder {
  sort: quizSort;
  order: order;
}

export const sorting = {
  categories: ['title', 'createdOn', 'updatedOn'] as quizSort[],
  order: ['asc', 'desc'] as order[],
};

export interface SortLabel {
  label: string;
  sortValue: quizSort;
  orderValue: order;
}

const sortingLabels: Record<quizSort, string> = {
  title: 'Title',
  createdOn: 'Date (created on)',
  updatedOn: 'Date (last updated)',
};

const orderLabels: Record<order, string> = {
  asc: 'Ascending',
  desc: 'Descending',
};

export const sortAndOrderLabels: SortLabel[] = sorting.categories.map(
  sort => sorting.order.map(
    order => (
      {
        label: `${sortingLabels[sort]} (${orderLabels[order]})`,
        sortValue: sort,
        orderValue: order,
      }
    ),
  ),
).reduce((acc, current) => acc.concat(current), []);
