import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FocusNewlyAddedFieldDirective } from './focus-newly-added-field.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-test',
  imports: [FocusNewlyAddedFieldDirective],
  template: `
    <textarea id="1"></textarea>
    <textarea id="2" appFocusNewlyAddedField></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {}

describe('FocusNewlyAddedFieldDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, FocusNewlyAddedFieldDirective],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('automatically focuses textarea after view', () => {
    const focus = document.activeElement;
    expect(focus?.id).toBe('2');
  });
});
