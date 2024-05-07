import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-questions-header',
  standalone: true,
  templateUrl: './quiz-questions-header.component.html',
  imports: [CommonModule],
  styleUrl: './quiz-questions-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizQuestionsHeaderComponent {
  @Input() counter!: number;
  @Input() currentQuestionNumber!: number;
  @Input() points!: number;
  @Input() progress!: number;
  @Input() totalQuestions!: number;
}
