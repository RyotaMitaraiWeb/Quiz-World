import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueSelectMenuComponent } from './catalogue-select-menu.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { sorting } from '../../constants/sorting.constants';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('CatalogueSelectMenuComponent', () => {
  let component: CatalogueSelectMenuComponent;
  let fixture: ComponentFixture<CatalogueSelectMenuComponent>;
  let loader: HarnessLoader;
  let change: any = {};
  describe('Unit tests' , () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogueSelectMenuComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(CatalogueSelectMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
      change = {
        source: {},
        value: 'a',
      };
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('select method', () => {
      it('Emits a selectEvent with the correct argument when called', () => {
        spyOn(component.selectEvent, 'emit');
        change.value = 'title-asc';
        component.select(change);

        expect(component.selectEvent.emit).toHaveBeenCalledOnceWith({
          sort: 'title',
          order: 'asc',
        });
      });

      it('Sets the selectedValue property to the correct value', () => {
        change.value = 'title-desc';
        component.select(change);

        expect(component.selectedValue).toBe('title-desc');
      });
    });

    describe('constructQuery', () => {
      it('constructs an object from the provided string', () => {
        const result = component.constructQuery('title-asc');
        expect(result).toEqual({
          sort: 'title',
          order: 'asc'
        });
      });

      it('throws an error if it cannot parse the value', () => {
        expect(() => component.constructQuery('nodash')).toThrow();
      });
    });
  });

  describe('Component tests' , () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CatalogueSelectMenuComponent, NoopAnimationsModule]
      });
      fixture = TestBed.createComponent(CatalogueSelectMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
      change = {
        source: {},
        value: 'a',
      };
    });
  
    describe('Render', () => {
      it('Renders the correct amount of options', async () => {
        const select = await loader.getHarness(MatSelectHarness);
        await select.open();
        const options = await select.getOptions();
        expect(options.length).toBe(sorting.order.length * sorting.categories.length);
      });

      it('Changes selected option based on the selectedValue property', async () => {
        component.selectedValue = 'title-desc';
        component.ngOnInit();
        fixture.detectChanges();

        const select = await loader.getHarness(MatSelectHarness);
        await select.open();
        fixture.detectChanges();
        
        const value = await select.getValueText();
        expect(value).toBe('Title (Descending)');
      });
    });

    describe('Changing an option', () => {
      it('Changes the selectedValue property when an option is clicked', async () => {
        const select = await loader.getHarness(MatSelectHarness);
        await select.open();
        fixture.detectChanges();
        const options = await select.getOptions();
        const option = options[1];
        await option.click();
        fixture.detectChanges();

        expect(component.selectedValue).toBe('title-desc');
      });
    });
  });
});
