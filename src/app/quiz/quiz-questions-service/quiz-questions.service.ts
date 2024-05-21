import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public questionList$: Subject<QuizQuestion[]> = new Subject();

  public currentQuestionNumber$: BehaviorSubject<number> = new BehaviorSubject(
    0
  );

  // public currentQuestion$: Observable<QuizQuestion> = combineLatest([
  //   this.questionList$,
  //   this.currentQuestionNumber$,
  // ]).pipe(
  //   takeUntilDestroyed(),
  //   map(
  //     ([questionList, currentQuestionNumber]): QuizQuestion =>
  //       currentQuestionNumber > questionList.length - 1
  //         ? questionList[questionList.length - 1]
  //         : questionList[currentQuestionNumber]
  //   )
  // );

  // public totalQuestions$: Observable<number> = this.questionList$.pipe(
  //   takeUntilDestroyed(),
  //   map((tl) => tl.length)
  // );

  // public progress$: Observable<number> = combineLatest([
  //   this.currentQuestionNumber$,
  //   this.totalQuestions$,
  // ]).pipe(
  //   takeUntilDestroyed(),
  //   map(([currentQuestionNumber, totalQuestions]) =>
  //     totalQuestions === 0 ? 0 : currentQuestionNumber / totalQuestions
  //   )
  // );

  public name$: BehaviorSubject<string> = new BehaviorSubject('Jessica');
  public isQuizActive$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public counter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public points$: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentQuizQuestion$: BehaviorSubject<QuizQuestion> =
    new BehaviorSubject({} as QuizQuestion);
  public isCurrentQuestionAnswered$: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  public isCurrentQuestionCorrect$: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  public isFirstQuestion$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  // public isQuizCompleted$: Observable<boolean> = combineLatest([
  //   this.questionList$,
  //   this.currentQuestionNumber$,
  // ]).pipe(
  //   takeUntilDestroyed(),
  //   map(
  //     (questionList, currentQuestionNumber) =>
  //       questionList.length < currentQuestionNumber
  //   )
  // );

  constructor(private readonly questionApiService: QuizQuestionsApiService) {
    this.questionList$ = new Subject();
    this.questionApiService
      .getQuestionJson()
      .pipe(takeUntilDestroyed())
      .subscribe((res) => {
        this.questionList$.next(res);

        this.currentQuestionNumber$.next(0);
      });
  }

  public getProgressPercent(currentQno: number) {
    return (currentQno / 15) * 100;
  }

  // public startQuiz() {}
  // public previousQuestion() {
  //   this.currentQuestion$;
  // }
  public resetQuiz() {}
  public nextQuestion() {}
  public answer(option: Option) {}
}
// Instead of providing flat value "questionList" (line 11) --> much better way
// push observable down to the component --> delegate down to the component
// So

// public name: string = '';
//   public currentQuestion: number = 0;
//   public points: number = 0;
//   counter = 60;
//   correctAnswer: number = 0;
//   inCorrectAnswer: number = 0;
//   interval$: any;
//   progress: string = '0';
//   isQuizCompleted$: Observable<boolean> =
//     this.quizQuestionsService.isQuizCompleted$;
//   questionList$: Observable<QuizQuestion[]>;
//   constructor(private quizQuestionsService: QuizQuestionsService) {
//     this.questionList$ = this.quizQuestionsService.getQuestionList();
//   }

//   ngOnInit(): void {
//     this.name = localStorage.getItem('name')!;
//     this.getAllQuestions();
//     this.startCounter();
//   }
//   getAllQuestions() {
//     return this.quizQuestionsService.getQuestionList();
//   }
//   // nextQuestion() {
//   //   this.currentQuestion++;
//   // }
//   // previousQuestion() {
//   //   this.currentQuestion--;
//   // }
//   answer(currentQno: number, option: any) {
//     if (this.isQuizCompleted$) {
//       //modified this to use the observable
//       this.stopCounter();
//     }
//     if (option.correct) {
//       this.points += 10;
//       this.correctAnswer++;
//       setTimeout(() => {
//         this.currentQuestion++;
//         this.resetCounter();
//         this.getProgressPercent();
//       }, 1000);
//     } else {
//       setTimeout(() => {
//         this.currentQuestion++;
//         this.inCorrectAnswer++;
//         this.resetCounter();
//         this.getProgressPercent();
//       }, 1000);

//       this.points -= 10;
//     }
//   }
//   startCounter() {
//     this.interval$ = interval(1000).subscribe((val) => {
//       this.counter--;
//       if (this.counter === 0) {
//         this.currentQuestion++;
//         this.counter = 60;
//         this.points -= 10;
//       }
//     });
//     setTimeout(() => {
//       this.interval$.unsubscribe();
//     }, 600000);
//   }
//   stopCounter() {
//     this.interval$.unsubscribe();
//     this.counter = 0;
//   }
//   resetCounter() {
//     this.stopCounter();
//     this.counter = 60;
//     this.startCounter();
//   }
//   // resetQuiz() {
//   //   this.resetCounter();
//   //   this.getAllQuestions();
//   //   this.points = 0;
//   //   this.counter = 60;
//   //   this.currentQuestion = 0;
//   //   this.progress = '0';
//   // }
//   getProgressPercent() {
//     return this.quizQuestionsService.getProgressPercent(this.currentQuestion);
//   }
// }

// // Comments:
// // Use ngrxPush vs async pipe
// // async has a flaw: broadens to include undefined, ngrxPush is the improved version
// // does lazy loading, deferal....superior to async pipe
