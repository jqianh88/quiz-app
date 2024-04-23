import { Component, NgModule, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { QuizQuestionsService } from '../quiz-questions-service/quiz-questions.service';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { ChangeBgDirective } from '../../change-bg.directive';
import { CommonModule } from '@angular/common';
import { QuizResultsComponent } from '../quiz-results/quiz-results.component';
import { QuizQuestion } from '../quiz-questions-service/quiz-questions.models';
import { LetDirective, PushPipe } from '@ngrx/component';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [WelcomeComponent, CommonModule, ChangeBgDirective, QuizResultsComponent, LetDirective, PushPipe],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.scss'
})
export class QuizQuestionsComponent implements OnInit {

  public name: string = "";
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted$ : Observable<boolean> = this.quizQuestionsService.isQuizCompleted$;
  questionList$ : Observable<QuizQuestion[]>
  constructor(private quizQuestionsService: QuizQuestionsService) {
    this.questionList$ = this.quizQuestionsService.getQuestionList()
   }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions() {
    return this.quizQuestionsService.getQuestionList()

  }
  nextQuestion() {
    let quizLen = 0;
    this.questionList$.subscribe(data => quizLen = data.length);
    this.currentQuestion = Math.min(this.currentQuestion + 1, quizLen - 1);
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {
    if (this.isQuizCompleted$){
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.nextQuestion();
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.nextQuestion();
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.nextQuestion();
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    return this.quizQuestionsService.getProgressPercent(this.currentQuestion);

  }
}




// Comments:
// Use ngrxPush vs async pipe
// async has a flaw: broadens to include undefined, ngrxPush is the improved version
// does lazy loading, deferal....superior to async pipe
