import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LoadingService } from 'src/app/core/loading/loading.service';

@Component({
  selector: 'app-catalogue-paginator',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './catalogue-paginator.component.html',
  styleUrls: ['./catalogue-paginator.component.scss']
})
export class CataloguePaginatorComponent {
  constructor(private readonly loadingService: LoadingService) { }
  
  protected get isLoading() {
    return this.loadingService.noRequests$;
  }

  @Output() pageEvent = new EventEmitter<number>();
  @Input() page = 1;
  @Input({ required: true }) total = 0;

  @Input() pageSize = 7;

  changePage(event: PageEvent) {
    const value = event.pageIndex;
    
    this.pageEvent.emit(value + 1);
    this.page = value + 1;
  }
}
