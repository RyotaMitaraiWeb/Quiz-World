import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISort } from '../../../types/components/catalogue-select-menu.types';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { order, sort } from '../../../types/others/lists.types';
import { sorting } from '../../constants/sorting.constants';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

interface ILabel {
  sort: string;
  asc: 'Ascending';
  desc: 'Descending';
}

@Component({
  selector: 'app-catalogue-select-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './catalogue-select-menu.component.html',
  styleUrls: ['./catalogue-select-menu.component.scss']
})
export class CatalogueSelectMenuComponent implements OnInit {
  constructor(private readonly fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.form.controls.value.setValue(this.selectedValue);
  }

  @Output() selectEvent = new EventEmitter<ISort>();
  @Input() selectedValue = 'title-asc';

  protected readonly categories = sorting.categories;
  protected readonly orderOptions = sorting.order;
  protected readonly labels: Record<sort, ILabel> = {
    title: {
      sort: 'Title',
      asc: 'Ascending',
      desc: 'Descending'
    },
    createdOn: {
      sort: 'Date of creation',
      asc: 'Ascending',
      desc: 'Descending',
    },
    updatedOn: {
      sort: 'Last updated',
      asc: 'Ascending',
      desc: 'Descending'
    }
  }

  select(change: MatSelectChange) {
    const value = change.value as string;
    const query = this.constructQuery(value);
    this.selectedValue = value;
    this.form.controls.value.setValue(this.selectedValue);
    this.selectEvent.emit(query);
  }

  protected form = this.fb.group({
    value: 'title-asc'
  });

  constructQuery(value: string): ISort {
    if (!value.includes('-')) {
      throw new Error('This option cannot be parsed');
    }

    const [sort, order] = value.split('-') as [sort, order];
    return {
      sort,
      order,
    };
  }
}
