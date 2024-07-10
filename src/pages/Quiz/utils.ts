import { IWord } from "../../store/Slices/types";
import { LessonQuestion } from "../Lesson/Questions/type";
import { generateQuestions } from "../Lesson/Questions/utils";

export const extractquestions = (words: IWord[]): LessonQuestion[] => {
  const questions = generateQuestions(words);
  return questions;
};
