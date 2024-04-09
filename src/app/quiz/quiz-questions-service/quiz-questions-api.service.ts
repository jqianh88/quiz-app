import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ApiQuizResults } from './quiz-questions.models';
@Injectable({
  providedIn: 'root'
})
export class QuizQuestionsApiService {

  constructor(private http : HttpClient) { }

  getQuestionJson(){
    return this.http.get<ApiQuizResults>("assets/questions.json");
  }
}
