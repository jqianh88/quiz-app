import { Injectable } from '@angular/core';
import { ApiQuizResults, Option, QuizQuestion } from './quiz-questions.models';
import { QuizQuestionsApiService } from './quiz-questions-api.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class QuizQuestionsService {
  private questionListSubject = new BehaviorSubject<QuizQuestion[]>([]);
  public questionList$ = this.questionListSubject.asObservable();

  public currentQuestionNumber$ = new BehaviorSubject<number>(1);

  public currentQuizQuestion$: Observable<QuizQuestion> = combineLatest([
    this.questionList$,
    this.currentQuestionNumber$,
  ]).pipe(
    takeUntilDestroyed(),
    map(
      ([questionList, currentQuestionNumber]): QuizQuestion =>
        questionList[currentQuestionNumber - 1] // Want to display starting from 1, but index questions from 0
    )
  );

  public totalQuestions$: Observable<number> = this.questionList$.pipe(
    takeUntilDestroyed(),
    map((questions) => questions.length)
  );

  public progress$: Observable<number> = combineLatest([
    this.currentQuestionNumber$,
    this.totalQuestions$,
  ]).pipe(
    map(([currentQuestionNumber, totalQuestions]) =>
      totalQuestions === 0 ? 0 : (currentQuestionNumber / totalQuestions) * 100
    )
  );

  public name$ = new BehaviorSubject<string>('Jessica');
  public isQuizActive$ = new BehaviorSubject<boolean>(true);
  public counter$ = new BehaviorSubject<number>(60);
  public points$ = new BehaviorSubject<number>(0);
  public isCurrentQuestionAnswered$ = new BehaviorSubject<boolean>(false);
  public isCurrentQuestionCorrect$ = new BehaviorSubject<boolean>(false);
  public isFirstQuestion$ = new BehaviorSubject<boolean>(true);

  public isQuizCompleted$: Observable<boolean> = combineLatest([
    this.questionList$,
    this.currentQuestionNumber$,
  ]).pipe(
    takeUntilDestroyed(),
    map(
      ([questionList, currentQuestionNumber]) =>
        currentQuestionNumber >= questionList.length
    )
  );

  constructor(private readonly questionApiService: QuizQuestionsApiService) {
    this.loadQuestions();
  }

  private loadQuestions() {
    this.questionApiService
      .getQuestionJson()
      .pipe(takeUntilDestroyed())
      .subscribe((questions) => {
        this.questionListSubject.next(questions);
        this.setCurrentQuestion(1); // Set to first question
      });
  }

  private setCurrentQuestion(index: number): void {
    const questionList = this.questionListSubject.getValue();
    if (index >= 0 && index <= questionList.length) {
      this.currentQuestionNumber$.next(index);
      this.isFirstQuestion$.next(index === 0);
    }
  }

  public startQuiz(): void {
    this.loadQuestions();
    this.setCurrentQuestion(0);
    this.isQuizActive$.next(true);
  }

  public previousQuestion(): void {
    const currentIndex = this.currentQuestionNumber$.getValue();
    if (currentIndex > 0) {
      this.setCurrentQuestion(currentIndex - 1);
    }
  }

  public nextQuestion(): void {
    const currentIndex = this.currentQuestionNumber$.getValue();
    const questionList = this.questionListSubject.getValue();
    if (currentIndex < questionList.length) {
      this.setCurrentQuestion(currentIndex + 1);
    }
  }

  public resetQuiz(): void {
    this.setCurrentQuestion(0);
    this.points$.next(0);
    this.isQuizActive$.next(true);
  }

  public answer(option: Option): void {
    // Implement the logic to handle answer selection
  }

  // Don't think we need the below anymore because of progress$
  // public getProgressPercent(currentQno: number) {
  //   const totalQuestions = this.questionListSubject.getValue().length;
  //   return totalQuestions === 0 ? 0 : ((currentQno + 1) / totalQuestions) * 100;
  // }
}

// // public name: string = '';
// //   public currentQuestion: number = 0;
// //   public points: number = 0;
// //   counter = 60;
// //   correctAnswer: number = 0;
// //   inCorrectAnswer: number = 0;
// //   interval$: any;
// //   progress: string = '0';
// //   isQuizCompleted$: Observable<boolean> =
// //     this.quizQuestionsService.isQuizCompleted$;
// //   questionList$: Observable<QuizQuestion[]>;
// //   constructor(private quizQuestionsService: QuizQuestionsService) {
// //     this.questionList$ = this.quizQuestionsService.getQuestionList();
// //   }

// //   ngOnInit(): void {
// //     this.name = localStorage.getItem('name')!;
// //     this.getAllQuestions();
// //     this.startCounter();
// //   }
// //   getAllQuestions() {
// //     return this.quizQuestionsService.getQuestionList();
// //   }
// //   // nextQuestion() {
// //   //   this.currentQuestion++;
// //   // }
// //   // previousQuestion() {
// //   //   this.currentQuestion--;
// //   // }
// //   answer(currentQno: number, option: any) {
// //     if (this.isQuizCompleted$) {
// //       //modified this to use the observable
// //       this.stopCounter();
// //     }
// //     if (option.correct) {
// //       this.points += 10;
// //       this.correctAnswer++;
// //       setTimeout(() => {
// //         this.currentQuestion++;
// //         this.resetCounter();
// //         this.getProgressPercent();
// //       }, 1000);
// //     } else {
// //       setTimeout(() => {
// //         this.currentQuestion++;
// //         this.inCorrectAnswer++;
// //         this.resetCounter();
// //         this.getProgressPercent();
// //       }, 1000);

// //       this.points -= 10;
// //     }
// //   }
// //   startCounter() {
// //     this.interval$ = interval(1000).subscribe((val) => {
// //       this.counter--;
// //       if (this.counter === 0) {
// //         this.currentQuestion++;
// //         this.counter = 60;
// //         this.points -= 10;
// //       }
// //     });
// //     setTimeout(() => {
// //       this.interval$.unsubscribe();
// //     }, 600000);
// //   }
// //   stopCounter() {
// //     this.interval$.unsubscribe();
// //     this.counter = 0;
// //   }
// //   resetCounter() {
// //     this.stopCounter();
// //     this.counter = 60;
// //     this.startCounter();
// //   }
// //   // resetQuiz() {
// //   //   this.resetCounter();
// //   //   this.getAllQuestions();
// //   //   this.points = 0;
// //   //   this.counter = 60;
// //   //   this.currentQuestion = 0;
// //   //   this.progress = '0';
// //   // }
// //   getProgressPercent() {
// //     return this.quizQuestionsService.getProgressPercent(this.currentQuestion);
// //   }
// // }

// // // Comments:
// // // Use ngrxPush vs async pipe
// // // async has a flaw: broadens to include undefined, ngrxPush is the improved version
// // // does lazy loading, deferal....superior to async pipe
