import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { ISort } from '../../../types/components/catalogue-select-menu.types';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
export class CatalogueSelectMenuComponent implements OnInit, OnChanges {
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.controls.value.setValue(this.selectedValue);    
  }

  @Output() selectEvent = new EventEmitter<string>();
  @Input({ required: true }) selectedValue = '';

  @Input({ required: true }) options: Record<string, string> = {};

  protected originalOrder(a: KeyValue<string, string>, b: KeyValue<string, string>) { 
    return 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value = changes['selectedValue'];

    if (value) {
      this.form.controls.value.setValue(value.currentValue);
      this.selectedValue = value.currentValue;
    }
  }

  select(change: MatSelectChange) {
    const value = change.value as string;
    this.selectedValue = value;
    this.form.controls.value.setValue(this.selectedValue);
    this.selectEvent.emit(value);
  }

  protected form = this.fb.group({
    value: ''
  });

  
}
