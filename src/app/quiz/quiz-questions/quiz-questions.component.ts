import { Component, OnInit } from '@angular/core';
import { QuizQuestionsService } from '../quiz-questions-service/quiz-questions.service';
import { LetDirective, PushPipe } from '@ngrx/component';
import { QuizQuestionsHeaderComponent } from './quiz-questions-header/quiz-questions-header.component';
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
  constructor(private quizQuestionsService: QuizQuestionsService) {}

  public ngOnInit(): void {
    this.quizQuestionsService.startQuiz();
  }

  public getAllQuestions() {
    return this.quizQuestionsService.getQuestionList();
  }

  public nextQuestion() {
    this.quizQuestionsService.nextQuestion();
  }

  public previousQuestion() {
    this.quizQuestionsService.previousQuestion();
  }

  public answer(option: string) {
    this.quizQuestionsService.answer(option);
  }

  public resetQuiz() {
    this.quizQuestionsService.resetQuiz();
  }
}
