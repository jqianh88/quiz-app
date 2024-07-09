import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiQuizResults, QuizQuestion } from '../../+state/quiz.models';

@Injectable({
  providedIn: 'root',
})
export class QuizQuestionsApiService {
  constructor(private http: HttpClient) {}

  public getQuestionJson(): Observable<QuizQuestion[]> {
    return this.http
      .get<ApiQuizResults>('assets/questions.json')
      .pipe(map((aqr) => aqr.questions));
  }
}

// Some notes:
// Messy translation --> Write a private function that you pass into the map function
// Not messy translation --> do the above which translates your "BE" to your "FE" interface
