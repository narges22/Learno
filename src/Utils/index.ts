import { QuizAnswer } from "../store/Slices/types";

export const getUserKnowledge = (answers: QuizAnswer[]): string[] => {
  const userKnowledge: string[] = answers.reduce((result, item) => {
    if (item.isCorrect && item.word.word) {
      // @ts-ignore
      result.push(item.word.word);
    }
    return result;
  }, []);
  return userKnowledge;
};
