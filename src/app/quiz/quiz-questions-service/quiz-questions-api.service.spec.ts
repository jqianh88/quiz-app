import { TestBed } from '@angular/core/testing';

import { QuizQuestionsApiService } from './quiz-questions-api.service';

describe('QuizQuestionsApiService', () => {
  let service: QuizQuestionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizQuestionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
