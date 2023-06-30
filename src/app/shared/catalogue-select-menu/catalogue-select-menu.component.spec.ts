import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueSelectMenuComponent } from './catalogue-select-menu.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HarnessLoader } from '@angular/cdk/testing';


describe('CatalogueSelectMenuComponent', () => {
  let component: CatalogueSelectMenuComponent;
  let fixture: ComponentFixture<CatalogueSelectMenuComponent>;
  let loader: HarnessLoader;

  describe('Unit tests' , () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogueSelectMenuComponent]
      });
      fixture = TestBed.createComponent(CatalogueSelectMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
