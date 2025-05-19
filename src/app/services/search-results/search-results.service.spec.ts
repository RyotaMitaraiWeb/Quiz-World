import { TestBed } from '@angular/core/testing';

import { SearchResultsService } from './search-results.service';
import { provideRouter } from '@angular/router';

describe('SearchResultsService', () => {
  let service: SearchResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    service = TestBed.inject(SearchResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
