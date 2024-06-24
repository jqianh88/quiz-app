import { Component, Input, NgModule, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuizQuestionsService } from '../quiz-questions-service/quiz-questions.service';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { ChangeBgDirective } from '../../change-bg.directive';
import { CommonModule } from '@angular/common';
import { QuizQuestion } from '../quiz-questions-service/quiz-questions.models';
import { LetDirective, PushPipe } from '@ngrx/component';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [
    WelcomeComponent,
    CommonModule,
    ChangeBgDirective,
    PushPipe,
    LetDirective,
  ],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss',
})
export class QuizResultsComponent implements OnInit {
  public name: string = '';
  @Input() questionList: QuizQuestion[] = [];

  public currentQuestion: number = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;

  constructor(protected readonly questionsService: QuizQuestionsService) {}

  ngOnInit(): void {}
}
