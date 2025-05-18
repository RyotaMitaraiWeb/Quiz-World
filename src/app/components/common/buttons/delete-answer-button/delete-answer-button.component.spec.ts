import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAnswerButtonComponent } from './delete-answer-button.component';

describe('DeleteAnswerButtonComponent', () => {
  let component: DeleteAnswerButtonComponent;
  let fixture: ComponentFixture<DeleteAnswerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAnswerButtonComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAnswerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
