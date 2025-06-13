import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuizSorterComponent } from './search-quiz-sorter.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { sorting } from '../../../common/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchQuizSorterComponent', () => {
  let component: SearchQuizSorterComponent;
  let fixture: ComponentFixture<SearchQuizSorterComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchQuizSorterComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchQuizSorterComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Correctly reflects the current value when it is set from the outside', async () => {
    fixture.componentRef.setInput('sortOptions', {
      sortBy: sorting.categories[1],
      order: sorting.order[1],
    });

    fixture.detectChanges();

    const select = await loader.getHarness(MatSelectHarness);
    await select.open();

    const options = await select.getOptions();

    expect(await options[3].isSelected()).toBeTrue();

    fixture.componentRef.setInput('sortOptions', {
      sortBy: sorting.categories[0],
      order: sorting.order[0],
    });

    fixture.detectChanges();

    expect(await options[0].isSelected()).toBeTrue();
  });

  it('Emits a correct event when an option is selected', async () => {
    const spy = spyOn(fixture.componentInstance.select, 'emit');

    const select = await loader.getHarness(MatSelectHarness);
    await select.open();

    const options = await select.getOptions();
    await options[1].click();

    expect(spy).toHaveBeenCalledWith(
      {
        sortBy: sorting.categories[0],
        order: sorting.order[1],
      },
    );
  });
});
