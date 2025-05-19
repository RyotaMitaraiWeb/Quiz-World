import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizGameStatsComponent } from './quiz-game-stats.component';
import { By } from '@angular/platform-browser';

describe('QuizGameStatsComponent', () => {
  let component: QuizGameStatsComponent;
  let fixture: ComponentFixture<QuizGameStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizGameStatsComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizGameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateStats(stats: (boolean | null)[]) {
    fixture.componentRef.setInput('questions', stats);
    fixture.detectChanges();
    return fixture.debugElement.queryAll(By.css('.question-count')).map(el => Number(el.nativeElement.textContent));
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stats correctly reflect properties', () => {
    fixture.componentRef.setInput('instantMode', true);
    fixture.detectChanges();

    const stats1 = updateStats([true, false, null]);
    expect(stats1).toEqual([1, 1, 1]);

    const stats2 = updateStats([true, true, false, null, false, null, null]);
    expect(stats2).toEqual([2, 2, 3]);

    const stats3 = updateStats([true, true]);
    expect(stats3).toEqual([2, 0, 0]);
  });

  it('Unanswered questions are not tracked in non-instant mode', () => {
    fixture.componentRef.setInput('instantMode', false);
    fixture.detectChanges();

    const stats1 = updateStats([true, false, null]);
    expect(stats1).toEqual([1, 1]);

    const stats2 = updateStats([true, true, false, null, false, null, null]);
    expect(stats2).toEqual([2, 2]);

    const stats3 = updateStats([true, true]);
    expect(stats3).toEqual([2, 0]);
  });
});
