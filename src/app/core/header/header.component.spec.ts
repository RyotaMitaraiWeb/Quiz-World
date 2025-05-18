import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AppStoreModule } from '../../store/app-store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../../types/store/store.types';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<IAppStore>;

  describe('Unit tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HeaderComponent, AppStoreModule, RouterTestingModule, NoopAnimationsModule]
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
});
