import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiQuizResults, QuizQuestion } from './quiz-questions.models';
import { QuizQuestionsApiService } from './quiz-questions-api.service';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  takeUntil,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root',
})
export class QuizQuestionsService {
  private questionList$: Observable<QuizQuestion[]> = this.questionApiService
    .getQuestionJson()
    .pipe(
      takeUntilDestroyed(),
      map((res) => res.questions)
    ); // protects api service, return questions from the res object

  public currentQuestion$: BehaviorSubject<number> = new BehaviorSubject(0);
  public isQuizCompleted$: Observable<boolean> = combineLatest([
    this.questionList$,
    this.currentQuestion$,
  ]).pipe(
    takeUntilDestroyed(),
    map(
      (questionList, currentQuestion) => questionList.length < currentQuestion
    )
  );

  public currentQuestionNumber$: BehaviorSubject<number> = new BehaviorSubject(
    0
  );
  public totalQuestions$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private readonly questionApiService: QuizQuestionsApiService) {
    // Actually doing DI
    // this.questionApiService.getQuestionJson()
    // clean up memory leak - bind operator  to this component's lifecycle, more ideal than take(1)
    // .pipe(takeUntilDestroyed())
    // .subscribe(res => {
    //   this.questionList = res.questions;
    // })
  }

  public getQuestionList() {
    return this.questionList$;
  }

  public getProgressPercent(currentQno: number) {
    return (currentQno / 15) * 100;
  }
}
// Instead of providing flat value "questionList" (line 11) --> much better way
// push observable down to the component --> delegate down to the component
// So
