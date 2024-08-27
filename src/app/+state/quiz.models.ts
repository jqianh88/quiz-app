export interface Option {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: Option[];
  explanation: string;
  answerIndex?: number;
}

export interface ApiQuizResults {
  questions: QuizQuestion[];
}
