import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

import {ApiQuizResults, QuizQuestion} from './quiz.models';

@Injectable({
  providedIn: 'root',
})
export class QuizApiService {
  private httpClient: HttpClient = inject(HttpClient);

  public getQuestionJson = (): Observable<QuizQuestion[]> =>
    this.httpClient
      .get<ApiQuizResults>('assets/questions.json')
      .pipe(map((aqr) => aqr.questions));
}
