import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { CataloguePaginatorComponent } from './catalogue-paginator.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('CataloguePaginatorComponent', () => {
  let component: CataloguePaginatorComponent;
  let fixture: ComponentFixture<CataloguePaginatorComponent>;
  let loader: HarnessLoader;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CataloguePaginatorComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(CataloguePaginatorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
