import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionsNavigationComponent } from './quiz-questions-navigation.component';

describe('QuizQuestionsNavigationComponent', () => {
  let component: QuizQuestionsNavigationComponent;
  let fixture: ComponentFixture<QuizQuestionsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizQuestionsNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizQuestionsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
