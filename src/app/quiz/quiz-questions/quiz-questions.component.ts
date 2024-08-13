import {Component, inject} from '@angular/core';
import {PushPipe} from '@ngrx/component';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {answerCurrentQuestion} from '../../+state/quiz.actions';
import {Option, QuizQuestion} from '../../+state/quiz.models';
import * as quizSelectors from '../../+state/quiz.selectors';
import {QuizQuestionComponent} from '../quiz-question/quiz-question.component';
import {QuizQuestionsHeaderComponent} from './quiz-questions-header/quiz-questions-header.component';
import {QuizQuestionsNavigationComponent} from './quiz-questions-navigation/quiz-questions-navigation.component';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [PushPipe, QuizQuestionsHeaderComponent, QuizQuestionsNavigationComponent, QuizQuestionComponent],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.scss',
})
export class QuizQuestionsComponent {
  private store: Store = inject(Store);

  protected name$: Observable<string> = this.store.pipe(select(quizSelectors.getName));
  protected isQuizActive$: Observable<boolean> = this.store.pipe(select(quizSelectors.getIsQuizActive));

  protected currentQuestionNumber$: Observable<number> = this.store.pipe(select(quizSelectors.getCurrentQuestionNumber));
  protected points$: Observable<number> = this.store.pipe(select(quizSelectors.getPoints));
  protected progress$: Observable<number> = this.store.pipe(select(quizSelectors.getProgress));
  protected totalQuestions$: Observable<number> = this.store.pipe(select(quizSelectors.getTotalQuestions));

  protected currentQuestion$: Observable<QuizQuestion> = this.store.pipe(select(quizSelectors.getCurrentQuestion));
  protected isCurrentQuestionAnswered$: Observable<boolean> = this.store.pipe(select(quizSelectors.getIsCurrentQuestionAnswered));
  protected isCurrentQuestionCorrect$: Observable<boolean> = this.store.pipe(select(quizSelectors.getIsCurrentQuestionCorrect));
  protected currentOption$: Observable<Option | null> = this.store.pipe(select(quizSelectors.getCurrentOption));

  // public ngOnInit(): void {
  //   this.quizQuestionsService.startQuiz();
  // }

  // public onPreviousQuestion() {
  //   this.quizQuestionsService.previousQuestion();
  // }

  // public onResetQuiz() {
  //   this.quizQuestionsService.resetQuiz();
  // }

  // public onNextQuestion() {
  //   this.quizQuestionsService.nextQuestion();
  // }

  // public onOptionSelect(option: Option) {
  //   this.quizQuestionsService.answer(option);
  // }

  protected onOptionSelect(option: Option) {
    this.store.dispatch(answerCurrentQuestion({option}));
    console.log(option);
  }
}
