import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'app-catalogue-select-menu',
  standalone: true,
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './catalogue-select-menu.component.html',
  styleUrls: ['./catalogue-select-menu.component.scss'],
})
export class CatalogueSelectMenuComponent
  implements OnInit, OnChanges, OnDestroy
{
  constructor(
    private readonly fb: FormBuilder,
    private readonly loadingService: LoadingService
  ) {}

  protected get noRequests() {
    return this.loadingService.noRequests$;
  }

  private sub = new Subscription();

  ngOnInit(): void {
    this.form.controls.value.setValue(this.selectedValue);
    this.sub = this.noRequests.subscribe((r) => {
      if (r) {
        this.form.enable();
      } else {
        this.form.disable();
      }
    });
  }

  @Output() selectEvent = new EventEmitter<string>();
  @Input({ required: true }) selectedValue = '';

  @Input({ required: true }) options: Record<string, string> = {};

  protected originalOrder(
    a: KeyValue<string, string>,
    b: KeyValue<string, string>
  ) {
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
    value: '',
  });

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
