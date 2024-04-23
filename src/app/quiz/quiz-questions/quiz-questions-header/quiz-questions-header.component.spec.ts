import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionsHeaderComponent } from './quiz-questions-header.component';

describe('QuizQuestionsComponent', () => {
  let component: QuizQuestionsHeaderComponent;
  let fixture: ComponentFixture<QuizQuestionsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizQuestionsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizQuestionsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
