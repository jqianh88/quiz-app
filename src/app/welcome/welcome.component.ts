import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {PushPipe} from '@ngrx/component';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as quizActions from '../+state/quiz.actions';
import * as quizSelectors from '../+state/quiz.selectors';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, RouterOutlet, PushPipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  private store: Store = inject(Store);

  protected name$: Observable<string> = this.store.pipe(select(quizSelectors.getName));

  protected startQuiz = (name: string) => this.store.dispatch(quizActions.setName({name}));
}
