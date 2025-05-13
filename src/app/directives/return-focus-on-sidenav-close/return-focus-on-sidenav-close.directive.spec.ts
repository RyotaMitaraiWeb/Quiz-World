import { Component } from '@angular/core';
import { ReturnFocusOnSidenavCloseDirective } from './return-focus-on-sidenav-close.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavService } from '../../services/sidenav/sidenav.service';

describe('ReturnFocusOnSidenavCloseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let sidenav: SidenavService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    sidenav = TestBed.inject(SidenavService);
    fixture.detectChanges();
  });

  it('Returns focus when sidenav is closed', () => {
    const spy = spyOn(HTMLButtonElement.prototype, 'focus').and.stub();

    sidenav.close();

    expect(spy).toHaveBeenCalled();
  });
});

@Component({
  imports: [ReturnFocusOnSidenavCloseDirective],
  template: '<button appReturnFocusOnSidenavClose>test</button>',
})
class TestComponent {}