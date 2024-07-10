import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWord, Lesson } from "./types";
import words from "../../Dummy/words.json";
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
  },
});

export const { setLessonWords, setLessonQuestions } = lessonSlice.actions;

export default lessonSlice.reducer;
