import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HideVisuallyDirective } from './hide-visually.directive';

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [HideVisuallyDirective],
  template: `
    <div class="test1" [appHideVisually]="true"></div>
    <div class="test2" [appHideVisually]="false"></div>
    <div class="test3" [appHideVisually]="shouldHide"></div>
    <button id="btn" (click)="shouldHide = !shouldHide">Click me</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
  shouldHide = true;
}


describe('HideVisuallyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, HideVisuallyDirective],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('applies the invisible class correctly', async () => {
    const div1 = fixture.nativeElement.querySelector('.test1');
    const div2 = fixture.nativeElement.querySelector('.test2');
    const div3 = fixture.nativeElement.querySelector('.test3');

    expect(div1?.classList.contains('invisible')).toBeTrue();
    expect(div2?.classList.contains('invisible')).toBeFalse();

    expect(div3?.classList.contains('invisible')).toBeTrue();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.test3').classList.contains('invisible')).toBeFalse();

    button.click();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.test3').classList.contains('invisible')).toBeTrue();
  });
});
