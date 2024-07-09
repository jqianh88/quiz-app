import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LetDirective, PushPipe } from '@ngrx/component';

import { QuizQuestion } from '../../+state/quiz.models';
import { ChangeBgDirective } from '../../change-bg.directive';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { QuizQuestionsService } from '../quiz-questions-service/quiz-questions.service';

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
