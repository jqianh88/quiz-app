import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PushPipe} from '@ngrx/component';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {setAbc} from '../+state/quiz.actions';
import {getAbc} from '../+state/quiz.selectors';
import {HeaderComponent} from '../header/header.component';
import {QuizQuestionsApiService} from '../quiz/quiz-questions-service/quiz-questions-api.service';
import {QuizQuestionsService} from '../quiz/quiz-questions-service/quiz-questions.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PushPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [QuizQuestionsService, QuizQuestionsApiService],
})
export class AppComponent implements OnInit {
  protected title = 'quiz-app';
  protected abc$: Observable<string> = this.store.pipe(select(getAbc));

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(setAbc({ abc: '123' }));
  }
}
