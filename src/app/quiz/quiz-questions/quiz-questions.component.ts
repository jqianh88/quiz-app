import { Component, OnInit } from '@angular/core';
import { QuizQuestionsService } from '../quiz-questions-service/quiz-questions.service';
import { LetDirective, PushPipe } from '@ngrx/component';
import { QuizQuestionsHeaderComponent } from './quiz-questions-header/quiz-questions-header.component';
import { Option } from '../quiz-questions-service/quiz-questions.models';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { QuizQuestionsNavigationComponent } from './quiz-questions-navigation/quiz-questions-navigation.component';
import { QuizResultsComponent } from '../quiz-results/quiz-results.component';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [
    LetDirective,
    PushPipe,
    QuizQuestionsHeaderComponent,
    QuizQuestionsNavigationComponent,
    QuizQuestionComponent,
    QuizResultsComponent,
  ],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.scss',
})
export class QuizQuestionsComponent implements OnInit {
  constructor(public quizQuestionsService: QuizQuestionsService) {}

  public ngOnInit(): void {
    this.quizQuestionsService.startQuiz();
  }

  public getAllQuestions() {
    return this.quizQuestionsService.getQuestionList();
  }

  public onPreviousQuestion() {
    this.quizQuestionsService.previousQuestion();
  }

  public onResetQuiz() {
    this.quizQuestionsService.resetQuiz();
  }

  public onNextQuestion() {
    this.quizQuestionsService.nextQuestion();
  }

  public onOptionSelect(option: Option) {
    this.quizQuestionsService.answer(option);
  }
}
