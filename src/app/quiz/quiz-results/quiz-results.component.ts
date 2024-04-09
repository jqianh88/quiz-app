import { Component, NgModule, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuizQuestionsService } from '../quiz-questions-service/quiz-questions.service';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { ChangeBgDirective } from '../../change-bg.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [WelcomeComponent, CommonModule, ChangeBgDirective],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss'
})
export class QuizResultsComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  constructor(private quizQuestionsService: QuizQuestionsService) { }

  ngOnInit(): void {

  }
}
