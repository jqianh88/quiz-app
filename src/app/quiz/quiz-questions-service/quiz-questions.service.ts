import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizQuestionsService {
  // private questionListSubject = new BehaviorSubject<QuizQuestion[]>([]);
  // private destroyRef = inject(DestroyRef);

  // public questionList$ = this.questionListSubject.asObservable();

  // public currentQuestionNumber$ = new BehaviorSubject<number>(1);

  // public currentQuizQuestion$: Observable<QuizQuestion> = combineLatest([
  //   this.questionList$,
  //   this.currentQuestionNumber$,
  // ]).pipe(
  //   takeUntilDestroyed(this.destroyRef),
  //   map(
  //     ([questionList, currentQuestionNumber]): QuizQuestion =>
  //       questionList[currentQuestionNumber - 1] // Want to display starting from 1, but index questions from 0
  //   )
  // );

  // public totalQuestions$: Observable<number> = this.questionList$.pipe(
  //   takeUntilDestroyed(this.destroyRef),
  //   map((questions) => questions.length)
  // );

  // public progress$: Observable<number> = combineLatest([
  //   this.currentQuestionNumber$,
  //   this.totalQuestions$,
  // ]).pipe(
  //   map(([currentQuestionNumber, totalQuestions]) =>
  //     totalQuestions === 0 ? 0 : (currentQuestionNumber / totalQuestions) * 100
  //   )
  // );

  // public name$ = new BehaviorSubject<string>('Jessica');
  // public isQuizActive$ = new BehaviorSubject<boolean>(true);
  public counter$ = new BehaviorSubject<number>(60);
  // public points$ = new BehaviorSubject<number>(0);
  // public questionsAttempted$ = new BehaviorSubject<number>(0);
  // public questionsCorrectlyAnswered$ = new BehaviorSubject<number>(0);
  // public questionsIncorrectlyAnswered$ = new BehaviorSubject<number>(0);
  // public currentAnswer$ = new BehaviorSubject<Option | null>(null);
  // public isCurrentQuestionAnswered$ = new BehaviorSubject<boolean>(false);
  // public isCurrentQuestionCorrect$ = new BehaviorSubject<boolean>(false);
  // public isFirstQuestion$ = new BehaviorSubject<boolean>(true);

  // public isQuizCompleted$: Observable<boolean> = combineLatest([
  //   this.questionList$,
  //   this.currentQuestionNumber$,
  // ]).pipe(
  //   takeUntilDestroyed(this.destroyRef),
  //   map(
  //     ([questionList, currentQuestionNumber]) =>
  //       currentQuestionNumber >= questionList.length
  //   )
  // );

  // constructor(
  //   private readonly questionApiService: QuizQuestionsApiService,
  //   private router: Router
  // ) {
  //   // this.loadQuestions();
  // }

  // private loadQuestions() {
  //   this.questionApiService
  //     .getQuestionJson()
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe((questions) => {
  //       this.questionListSubject.next(questions);
  //       this.setCurrentQuestion(1); // Set to first question
  //     });
  // }

  private setCurrentQuestion(index: number): void {
    const questionList = this.questionListSubject.getValue();
    if (index >= 0 && index <= questionList.length) {
      this.currentAnswer$.next(null);
      this.isCurrentQuestionCorrect$.next(false);
      this.isCurrentQuestionAnswered$.next(false);
      this.currentQuestionNumber$.next(index);
      this.isFirstQuestion$.next(index === 0);
    }
  }

  // public startQuiz(): void {
  //   this.loadQuestions();
  //   this.setCurrentQuestion(0);
  //   this.isCurrentQuestionAnswered$.next(false);
  //   this.questionsCorrectlyAnswered$.next(0);
  //   this.questionsIncorrectlyAnswered$.next(0);
  //   this.isQuizActive$.next(true);
  // }

  // public previousQuestion(): void {
  //   const currentIndex = this.currentQuestionNumber$.getValue();
  //   if (currentIndex > 0) {
  //     this.setCurrentQuestion(currentIndex - 1);
  //   }
  // }

  // public nextQuestion(): void {
  //   const currentIndex = this.currentQuestionNumber$.getValue();
  //   const questionList = this.questionListSubject.getValue();
  //   this.questionsAttempted$.next(this.questionsAttempted$.getValue() + 1);
  //   if (!this.isCurrentQuestionAnswered$.getValue()) {
  //     this.questionsIncorrectlyAnswered$.next(
  //       this.questionsIncorrectlyAnswered$.getValue() + 1
  //     );
  //   }

  //   if (
  //     currentIndex >= questionList.length &&
  //     this.isCurrentQuestionAnswered$
  //   ) {
  //     this.router.navigate(['/quiz-results']);
  //   } else if (currentIndex < questionList.length) {
  //     this.setCurrentQuestion(currentIndex + 1);
  //   }
  // }

  // public resetQuiz(): void {
  //   console.log('are we working?');
  //   this.startQuiz();
  // }

  // public answer(option: Option): void {
  //   this.currentAnswer$.next(option);
  //   this.isCurrentQuestionAnswered$.next(true);
  //   this.isCurrentQuestionCorrect$.next(!!option.correct);
  //   if (option.correct) {
  //     this.points$.next(this.points$.value + 1);
  //     this.questionsCorrectlyAnswered$.next(
  //       this.questionsCorrectlyAnswered$.getValue() + 1
  //     );
  //   } else {
  //     this.questionsIncorrectlyAnswered$.next(
  //       this.questionsIncorrectlyAnswered$.getValue() + 1
  //     );
  //   }
  // }

  // Don't think we need the below anymore because of progress$
  // public getProgressPercent(currentQno: number) {
  //   const totalQuestions = this.questionListSubject.getValue().length;
  //   return totalQuestions === 0 ? 0 : ((currentQno + 1) / totalQuestions) * 100;
  // }
}

// // // Comments:
// // // Use ngrxPush vs async pipe
// // // async has a flaw: broadens to include undefined, ngrxPush is the improved version
// // // does lazy loading, deferal....superior to async pipe
