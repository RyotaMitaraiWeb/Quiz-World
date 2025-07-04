import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { order, quizSort, SortAndOrder, sortAndOrderLabels, sorting } from '../../../common/sort';

@Component({
  selector: 'app-search-quiz-sorter',
  imports: [MatSelectModule],
  templateUrl: './search-quiz-sorter.component.html',
  styleUrl: './search-quiz-sorter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchQuizSorterComponent {
  protected readonly options = sortAndOrderLabels;

  readonly sortOptions = input<SortAndOrder>(
    {
      sortBy: sorting.categories[0],
      order: sorting.order[0],
    },
  );

  selectSearch = output<SortAndOrder>();

  protected readonly selectedValue = computed(() => {
    const options = this.sortOptions();
    const { sortBy, order } = options;
    return `${sortBy}-${order}`;
  });

  updateSorting(value: string) {
    const sortBy = this._extractSortCategory(value);
    const order = this._extractOrder(value);

    this.selectSearch.emit({ sortBy, order });
  }

  private _extractSortCategory(value: string) {
    const sort = value.split(this.sortAndOrderDelimiter)[this.sortingCategoryIndex] as quizSort;

    if (!sorting.categories.includes(sort)) {
      throw new Error('Invalid sorting category was picked');
    }

    return sort;
  }

  private _extractOrder(value: string) {
    const order = value.split(this.sortAndOrderDelimiter)[this.orderIndex] as order;

    if (!sorting.order.includes(order)) {
      throw new Error('Invalid order was picked');
    }

    return order;
  }

  protected readonly sortAndOrderDelimiter = '-';
  private readonly sortingCategoryIndex = 0;
  private readonly orderIndex = 1;
}
