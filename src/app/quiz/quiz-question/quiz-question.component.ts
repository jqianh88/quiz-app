import {CommonModule, NgClass} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LetDirective, PushPipe} from '@ngrx/component';

import {Option, QuizQuestion} from '../../+state/quiz.models';
import {ChangeBgDirective} from '../../change-bg.directive';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule, ChangeBgDirective, LetDirective, PushPipe, NgClass],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss',
})
export class QuizQuestionComponent {
  @Input() quizQuestion!: QuizQuestion;
  @Input() isAnswered: boolean = false;
  @Input() isCorrect?: boolean;
  @Input() answer: Option | null = null;

  @Output() optionSelect: EventEmitter<Option> = new EventEmitter();
  public onClick = (option: Option) => this.optionSelect.emit(option);
}
