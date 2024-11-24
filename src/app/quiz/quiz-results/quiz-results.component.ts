import {Component, inject} from '@angular/core';
import {PushPipe} from '@ngrx/component';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as quizSelectors from '../../+state/quiz.selectors';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [PushPipe],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss',
})
export class QuizResultsComponent {
  private store: Store = inject(Store);

  protected points$: Observable<number> = this.store.pipe(select(quizSelectors.getPoints));
  protected totalQuestions$: Observable<number> = this.store.pipe(select(quizSelectors.getTotalQuestions));
  protected correctAnswerCount$: Observable<number> = this.store.pipe(select(quizSelectors.getCorrectAnswerCount));
  protected incorrectAnswerCount$: Observable<number> = this.store.pipe(select(quizSelectors.getIncorrectAnswerCount));
}
