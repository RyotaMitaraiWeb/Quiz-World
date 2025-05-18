import { Component } from '@angular/core';
import { SearchFieldDirective } from './search-field.directive';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  imports: [SearchFieldDirective, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" appSearchField>
      <input id="field" formControlName="query" />
      <button id="submit" type="submit">Submit</button> 
    </form>
  `,
})
class TestComponent {
  protected readonly form = new FormGroup({
    query: new FormControl(''),
  });
}

describe('SearchFieldDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Redirects with the proper URL when submitted', async () => {
    const input = document.querySelector('#field') as HTMLInputElement;
    input.value = 'test';
    const spy = spyOn(router, 'navigate');
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    await fixture.whenStable();
    fixture.detectChanges();

    const submitButton = document.querySelector('#submit') as HTMLButtonElement;

    submitButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(['quiz', 'search'], { queryParams: { query: 'test' }});
  });

  it('Does not redirect when the field is empty', async () => {
    const input = document.querySelector('#field') as HTMLInputElement;
    input.value = '';
    const spy = spyOn(router, 'navigate');
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    await fixture.whenStable();
    fixture.detectChanges();

    const submitButton = document.querySelector('#submit') as HTMLButtonElement;

    submitButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
  });
});
