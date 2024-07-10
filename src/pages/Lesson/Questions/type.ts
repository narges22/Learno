import { IWord } from "../../../store/Slices/types";
import { IHint } from "./utils";

export enum LQuestionTypesEnum {
  MeaningWord = "mw",
  WordMeaning = "wm",
  AcademicWord = "aw",
  WordAcademic = "wa",
}

export interface LessonQuestion {
  id?: string;
  type: LQuestionTypesEnum;
  word: IWord;
  title: string;
  answers: string[];
}

export enum catIcon {
  info = "info",
  clever = "clever",
  happy = "happy",
  sad = "sad",
  waiting = "waiting",
}

export interface IFeedback {
  text?: string;
  hint?: IHint;
  icon: string;
}

export enum Ianswer {
  initial = "initial",
  selected = "selected",
  correct = "correct",
  inCorrect = "inCorrect",
}
