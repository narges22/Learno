import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWord, Lesson } from "./types";
import { LessonQuestion } from "../../pages/Lesson/Questions/type";

const initialState: Lesson = {
  vocabularies: [],
  questions: [],
  extras: [],
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessonWords: (state, action: PayloadAction<IWord[]>) => {
      state.vocabularies = action.payload;
    },
    setLessonQuestions: (state, action: PayloadAction<LessonQuestion[]>) => {
      state.questions = action.payload;
    },
    resetLesson: (state) => {
      state.vocabularies = [];
      state.questions = [];
    },
  },
});

export const { setLessonWords, setLessonQuestions, resetLesson } =
  lessonSlice.actions;

export default lessonSlice.reducer;
