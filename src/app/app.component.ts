import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { QuizQuestionsService } from './quiz/quiz-questions-service/quiz-questions.service';
import { QuizQuestionsApiService } from './quiz/quiz-questions-service/quiz-questions-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [QuizQuestionsService, QuizQuestionsApiService]
})
export class AppComponent {
  title = 'quiz-app';

}
