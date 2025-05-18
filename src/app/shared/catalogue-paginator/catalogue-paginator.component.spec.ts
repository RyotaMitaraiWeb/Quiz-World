import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { CataloguePaginatorComponent } from './catalogue-paginator.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';


describe('CataloguePaginatorComponent', () => {
  let component: CataloguePaginatorComponent;
  let fixture: ComponentFixture<CataloguePaginatorComponent>;
  let loader: HarnessLoader;
  let change = new PageEvent();

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CataloguePaginatorComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(CataloguePaginatorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
      change.length = 100;
      change.pageIndex = 0;
      change.pageSize = 5;
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('changePage', () => {
      it('Changes the page to the correct value', () => {
        change.pageIndex = 1;
        component.changePage(change);

        expect(component.page).toBe(2);
      });

      it('Emits a changePage event with the correct value', () => {
        spyOn(component.pageEvent, 'emit');

        change.pageIndex = 1;
        component.changePage(change);
        expect(component.pageEvent.emit).toHaveBeenCalledOnceWith(2);
      });
    });
  });
});
