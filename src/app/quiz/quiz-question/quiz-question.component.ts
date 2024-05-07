import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, interval } from 'rxjs';
import { QuizQuestionsService } from '../quiz-questions-service/quiz-questions.service';
import { ChangeBgDirective } from '../../change-bg.directive';
import { CommonModule } from '@angular/common';
import {
  QuizQuestion,
  Option,
} from '../quiz-questions-service/quiz-questions.models';
import { LetDirective, PushPipe } from '@ngrx/component';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule, ChangeBgDirective, LetDirective, PushPipe],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss',
})
export class QuizQuestionComponent {
  @Input() quizQuestion!: QuizQuestion;
  @Input() isAnswered: boolean = false;
  @Input() isCorrect?: boolean;

  @Output() optionSelect: EventEmitter<Option> = new EventEmitter();
  public onOptionSelect = (option: Option) => this.optionSelect.emit(option);
}
