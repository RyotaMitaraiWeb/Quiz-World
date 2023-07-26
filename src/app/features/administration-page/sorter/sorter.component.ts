import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { order } from '../../../../types/others/lists.types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { sorting } from '../../../constants/sorting.constants';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-sorter',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit, OnChanges {
  constructor(
    private readonly location: Location,
    private readonly fb: FormBuilder,
  ) { }

  @Output() updateOrderEvent = new EventEmitter<order>;

  page = 0;

  ngOnInit(): void {
    this.page = Number(this.getQueryString('page')) || 1;
  }

  /**
   * Returns the given query string from the URL.
   * @param query 
   * @returns the query string or null if the query string is absent from the URL.
   */
  getQueryString(query: string): string | null {
    const url: URL = new URL(window.top?.location.href || '');
    const params: URLSearchParams = url.searchParams;
    return params.get(query);
  }

  @Input() selectedValue: order = 'asc';

  ngOnChanges(changes: SimpleChanges): void {
    const value = changes['selectedValue'];

    if (value) {
      this.form.controls.value.setValue(value.currentValue);
      this.selectedValue = value.currentValue;
    }
  }

  protected readonly orderOptions = sorting.order;
  protected readonly labels = [
    {
      value: 'asc',
      label: 'Ascending',
    },
    {
      value: 'desc',
      label: 'Descending',
    }
  ]

  select(change: MatSelectChange) {
    const value = change.value as order;
    this.selectedValue = value;
    this.form.controls.value.setValue(this.selectedValue);
    this.updateOrderEvent.emit(value);

    this.updateURL();
  }

  protected form = this.fb.group({
    value: 'asc'
  });

  private updateURL(): void {
    let params = new HttpParams().appendAll(
      {
        page: this.page.toString(),
        order: this.selectedValue,
      },
    );

    const searchQuery = this.getQueryString('query');
    if (searchQuery) {
      params = params.append('query', searchQuery);
    }

    this.location.replaceState(
      location.pathname,
      params.toString()
    );
  }
}
