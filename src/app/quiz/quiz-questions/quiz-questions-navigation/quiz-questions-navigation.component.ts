import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-questions-navigation',
  standalone: true,
  imports: [],
  templateUrl: './quiz-questions-navigation.component.html',
  styleUrl: './quiz-questions-navigation.component.scss',
})
export class QuizQuestionsNavigationComponent {
  @Input() shouldAllowPreviousQuestion!: boolean;
  @Output() previousQuestion: EventEmitter<void> = new EventEmitter();
  @Output() resetQuiz: EventEmitter<void> = new EventEmitter();
  @Output() nextQuestion: EventEmitter<void> = new EventEmitter();

  public onPreviousClick(): void {
    this.previousQuestion.emit();
  }
  public onResetClick(): void {
    this.resetQuiz.emit();
  }
  public onNextClick(): void {
    this.nextQuestion.emit();
  }
}
