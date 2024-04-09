import { Component, Input, NgModule, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuizQuestionsService } from '../quiz-questions-service/quiz-questions.service';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { ChangeBgDirective } from '../../change-bg.directive';
import { CommonModule } from '@angular/common';
import { QuizQuestion } from '../quiz-questions-service/quiz-questions.models';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [WelcomeComponent, CommonModule, ChangeBgDirective],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss'
})
export class QuizResultsComponent implements OnInit {

  public name: string = "";
  // public get questionList(): QuizQuestion[] {
  //   return this.quizQuestionsService.getQuestionList()
  // };
  @Input() questionList: QuizQuestion[] = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;


  ngOnInit(): void {

  }
}
