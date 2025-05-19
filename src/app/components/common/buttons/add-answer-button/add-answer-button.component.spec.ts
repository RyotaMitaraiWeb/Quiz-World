import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerButtonComponent } from './add-answer-button.component';

describe('AddAnswerButtonComponent', () => {
  let component: AddAnswerButtonComponent;
  let fixture: ComponentFixture<AddAnswerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnswerButtonComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnswerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
