import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionsQuestionOptionComponent } from './quiz-questions-question-option.component';

describe('QuizQuestionsQuestionOptionComponent', () => {
  let component: QuizQuestionsQuestionOptionComponent;
  let fixture: ComponentFixture<QuizQuestionsQuestionOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizQuestionsQuestionOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizQuestionsQuestionOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
