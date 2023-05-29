import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AppStoreModule } from '../../store/app-store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<IAppStore>;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HeaderComponent, AppStoreModule, RouterTestingModule]
      });
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(Store<IAppStore>);
      
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Component tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HeaderComponent, AppStoreModule, RouterTestingModule]
      });
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(Store<IAppStore>);
      
      fixture.detectChanges();
    });

    it('Loads banner and navigation menu', () => {
      const headerDe = fixture.debugElement;
      const headerEl: HTMLElement = headerDe.nativeElement;

      const banner = headerEl.querySelector('.banner')!;
      expect(banner.textContent).toBe('Quiz World');

      const nav = document.querySelector('#nav');
      expect(nav).toBeTruthy();
    });
  });
});
