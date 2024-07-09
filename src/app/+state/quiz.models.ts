export interface Option {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  questionText: string;
  options: Option[];
  explanation: string;
}

export interface ApiQuizResults {
  questions: QuizQuestion[];
}
