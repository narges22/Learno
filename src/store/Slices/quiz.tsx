import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import questions from "../../Dummy/quizQuestions.json";
import { IWord, Question } from "./types";
import { LessonQuestion } from "../../pages/Lesson/Questions/type";

export interface QuizState {
  questions: LessonQuestion[];
  words: IWord[];
}

const initialState: QuizState = {
  questions: [],
  words: [],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setquizWords: (state, action: PayloadAction<IWord[]>) => {
      state.words = action.payload;
    },
    setQuizQuestions: (state, action: PayloadAction<LessonQuestion[]>) => {
      state.questions = action.payload;
    },
  },
});

export const { setquizWords, setQuizQuestions } = quizSlice.actions;

export default quizSlice.reducer;
