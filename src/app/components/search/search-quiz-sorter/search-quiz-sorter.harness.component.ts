import { ComponentHarness } from '@angular/cdk/testing';
import { MatSelectHarness } from '@angular/material/select/testing';

export class SearchQuizSorterHarness extends ComponentHarness {
  static hostSelector = 'app-search-quiz-sorter';

  private getMatSelect = this.locatorFor(MatSelectHarness);

  async select(optionIndex: number) {
    const matSelect = await this.getMatSelect();
    await matSelect.open();

    const options = await matSelect.getOptions();
    await options[optionIndex].click();

    await matSelect.close();
  }
}