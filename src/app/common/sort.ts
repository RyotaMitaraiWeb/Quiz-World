export type quizSort = 'Title' | 'CreatedOn' | 'UpdatedOn';
export type order = 'Ascending' | 'Descending';

export interface SortAndOrder {
  sortBy: quizSort;
  order: order;
}

export const sorting = {
  categories: ['Title', 'CreatedOn', 'UpdatedOn'] as quizSort[],
  order: ['Ascending', 'Descending'] as order[],
};

export interface SortLabel {
  label: string;
  sortValue: quizSort;
  orderValue: order;
}

const sortingLabels: Record<quizSort, string> = {
  Title: 'Title',
  CreatedOn: 'Date (created on)',
  UpdatedOn: 'Date (last updated)',
};

const orderLabels: Record<order, string> = {
  Ascending: 'Ascending',
  Descending: 'Descending',
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

export const activityLogsOrderLabels: Record<order, string> = sorting.order.reduce(
  (state, order) => (
    {...state, [order]: `Date ${order.toLowerCase()}`}
  ), {} as Record<order, string>,
);

export const profileSearchOrderLabels: Record<order, string> = sorting.order.reduce(
  (state, order) => (
    {...state, [order]: `Username ${order.toLowerCase()}`}
  ), {} as Record<order, string>,
);