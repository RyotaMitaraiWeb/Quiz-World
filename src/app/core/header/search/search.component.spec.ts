import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: Router;
  const event = new Event('submit');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchComponent, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit tests', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.stub();
    });

    describe('search', () => {
      it('Does not call navigate if the title control is empty', () => {
        component.title.reset();

        component.search(event);
        expect(router.navigate).not.toHaveBeenCalled();
      });

      it('Correctly calls navigate when the title control is not empty', () => {
        component.title.setValue('test');

        component.search(event);
        expect(router.navigate).toHaveBeenCalledWith(
          ['/quiz', 'search'],
          {
            queryParams: {
              search: 'test',
            },
            skipLocationChange: false,
          }
        );
      });
    });
  });
});
