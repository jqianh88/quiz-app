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
// export interface Option {
//   text: string;
// }
// export interface CorrectOption {
//   text: string;
//   correct: boolean;
// }

// export interface QuizQuestion {
//   questionText: string;
//   options: (Option | CorrectOption)[];    // Cool way to use OR [of a certain data type]
//   explanation: string;
// }

