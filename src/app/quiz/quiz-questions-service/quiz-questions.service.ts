import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiQuizResults, Option, QuizQuestion } from './quiz-questions.models';
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
  public name$: BehaviorSubject<string> = new BehaviorSubject('Jessica');
  public isQuizActive$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public counter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public points$: BehaviorSubject<number> = new BehaviorSubject(0);
  public progress$: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentQuizQuestion$: BehaviorSubject<QuizQuestion> =
    new BehaviorSubject({} as QuizQuestion);
  public isCurrentQuestionAnswered$: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  public isCurrentQuestionCorrect$: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  public isFirstQuestion$: BehaviorSubject<boolean> = new BehaviorSubject(true);

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

  public startQuiz() {}
  public previousQuestion() {}
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
