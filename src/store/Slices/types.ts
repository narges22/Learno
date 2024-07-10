import { LessonQuestion } from "../../pages/Lesson/Questions/type";

export interface QuizAnswer {
  questionType: string;
  questionId: number | string;
  answer: string;
  isCorrect?: boolean;
  word: IWord;
}

export interface IProfile {
  name: string;
  surname: string;
  token: string;
  email: string;
  userKnowledge?: String[];
}

export interface UserState {
  profile: IProfile;
  phone?: number;
  level: number;
  quizAnswers: QuizAnswer[];
  hints: number;
  lessonAnswers: ILessonAnswer[];
}

export interface Question {
  id: number;
  title: string;
  type: string;
  answers: string[];
}

export interface IWord {
  id: string;
  word: string;
  meaning: string;
  complexity: number;
  academicSynonym: string;
  defaultlevel: number | undefined;
  partOfSpeach: string;
  example: string;
}

interface answerOption {
  option: string;
  relatedWorld: IWord;
}

// interface LessonQuestion {
//   title: string;
//   relatedWorld: IWord;
//   answerOptions: answerOption[];
// }

export interface Lesson {
  vocabularies: IWord[];
  questions: LessonQuestion[];
  extras: IWord[];
}

export interface ILessonAnswer {
  attempts: number;
  withHint: boolean;
  isCorrect: boolean;
  word: string;
}
