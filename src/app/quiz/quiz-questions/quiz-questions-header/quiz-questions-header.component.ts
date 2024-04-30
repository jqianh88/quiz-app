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
  @Input() currentQuestionNumber!: number;
  @Input() totalQuestions!: number;
  @Input() points!: number;
  @Input() counter!: number;
  @Input() progress!: number;
}
