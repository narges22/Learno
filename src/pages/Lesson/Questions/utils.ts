import { IWord } from "../../../store/Slices/types";
import {
  IFeedback,
  Ianswer,
  LQuestionTypesEnum,
  LessonQuestion,
  catIcon,
} from "./type";
import catInfo from "../../../assets/cat/info.svg";
import catWaiting from "../../../assets/cat/waiting.svg";
import catClever from "../../../assets/cat/clever.svg";
import catHappy from "../../../assets/cat/happy.svg";
import catSad from "../../../assets/cat/sad.svg";

export const iconsData = {
  info: catInfo,
  waiting: catWaiting,
  sad: catSad,
  happy: catHappy,
  clever: catClever,
};

const Qtitle = {
  mw: "which of the following words is the best fit for",
  wm: "what is the meaning of",
  aw: "which of the following vocabularies has the same meaning with",
  wa: "which of the following vocabularies is the academic synonym of",
};

export const defineQuestionTypes = (numberOfVocabularies: number) => {
  const randomQuestionTypes = [];
  const types = Object.values(LQuestionTypesEnum);

  const randomNumber = (): number => {
    return Math.floor(Math.random() * types.length) + 1;
  };
  for (let i = 0; i < numberOfVocabularies; i++) {
    randomQuestionTypes[i] = types[randomNumber() - 1];
  }
  return randomQuestionTypes;
};

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getPossibleOptions = (
  word: IWord,
  words: IWord[],
  questionType: LQuestionTypesEnum
) => {
  const randomNumber = (): number => {
    return Math.floor(Math.random() * words.length) + 1;
  };
  const options: string[] = [];
  const getOptions = (key: keyof IWord) => {
    options.push(word[key] as string);
    while (options.length < 4) {
      const option = words[randomNumber() - 1][key] as string;
      if (!options.find((o) => o === option) && options.length < 4)
        options.push(option);
    }
    return shuffleArray(options);
  };

  switch (questionType) {
    case LQuestionTypesEnum.MeaningWord:
      return getOptions("word");
    case LQuestionTypesEnum.WordMeaning:
      return getOptions("meaning");
    case LQuestionTypesEnum.AcademicWord:
      return getOptions("word");
    case LQuestionTypesEnum.WordAcademic:
      return getOptions("academicSynonym");
  }
};

export const generateQuestions = (words: IWord[]): LessonQuestion[] => {
  const finalTypes = defineQuestionTypes(words.length);
  const finalQuesions = words.map((w, index) => {
    return {
      type: finalTypes[index],
      word: w,
      title: Qtitle[finalTypes[index]],
      answers: getPossibleOptions(w, words, finalTypes[index]),
    };
  });

  return finalQuesions;
};

export const checkAnswer = (word: IWord, answer: string) => {
  if (
    word.word === answer ||
    word.meaning === answer ||
    word.academicSynonym === answer
  ) {
    return Ianswer.correct;
  }
  return Ianswer.inCorrect;
};

export const checkAnswerBoolean = (word: IWord, answer: string) => {
  if (
    word.word === answer ||
    word.meaning === answer ||
    word.academicSynonym === answer
  ) {
    return true;
  }
  return false;
};

export const getFeedback = (
  isCorrect?: Ianswer,
  hasHint?: IHint
): IFeedback => {
  let feedback: IFeedback = {
    icon: iconsData[catIcon.waiting],
    text: "choose your answer and I can help you!",
  };
  if (isCorrect === Ianswer.inCorrect) {
    feedback = {
      icon: iconsData[catIcon.sad],
      hint: hasHint,
      text: "this is not correct!",
    };
  }
  if (isCorrect === Ianswer.correct) {
    feedback = {
      icon: iconsData[catIcon.happy],
      text: "Horrray!",
    };
  }
  return feedback;
};

export interface IHint {
  part1?: string;
  part2?: string;
}
export const generateHint = (
  selectesAnswer: string,
  questionType: LQuestionTypesEnum,
  vocabs: IWord[]
) => {
  let targetWord = undefined;
  let hint: IHint = {};
  if (questionType === LQuestionTypesEnum.MeaningWord) {
    targetWord = vocabs.find((w) => w.word === selectesAnswer);
    hint.part1 = `the meaning of this word is`;
    hint.part2 = targetWord?.meaning;
  }
  if (questionType === LQuestionTypesEnum.AcademicWord) {
    targetWord = vocabs.find((w) => w.word === selectesAnswer);
    hint.part1 = `the academic Synonim of this word is`;
    hint.part2 = targetWord?.academicSynonym;
  }
  if (questionType === LQuestionTypesEnum.WordAcademic) {
    targetWord = vocabs.find((w) => w.academicSynonym === selectesAnswer);
    hint.part1 = `this is the academic Synonim of`;
    hint.part2 = targetWord?.word;
  }
  if (questionType === LQuestionTypesEnum.WordMeaning) {
    targetWord = vocabs.find((w) => w.meaning === selectesAnswer);
    hint.part1 = `this is the meaning  of`;
    hint.part2 = targetWord?.word;
  }
  return hint;
};
