import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { ILessonAnswer, IProfile, QuizAnswer, UserState } from "./types";

const initialState: UserState = {
  profile: {
    name: "",
    surname: "",
    token: "",
    email: "",
    userKnowledge: [],
  },
  level: 1,
  quizAnswers: [],
  hints: 2,
  lessonAnswers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAnswer(state: UserState, action: PayloadAction<QuizAnswer>) {
      state.quizAnswers.push(action.payload);
    },
    addLessonAnswer(state: UserState, action: PayloadAction<ILessonAnswer>) {
      const tmp = state.lessonAnswers || [];
      tmp.push(action.payload);
      state.lessonAnswers = tmp;
    },
    resetAnswers: (state: UserState) => {
      state.lessonAnswers = [];
    },
    resetQuizAnsers: (state: UserState) => {
      state.quizAnswers = [];
    },
    updateUserProfile: (state: UserState, action: PayloadAction<IProfile>) => {
      state.profile = action.payload;
    },
    updateUserKnowledge: (
      state: UserState,
      action: PayloadAction<String[]>
    ) => {
      state.profile.userKnowledge = {
        ...state.profile.userKnowledge,
        ...action.payload,
      };
    },
  },
});

export const {
  addAnswer,
  addLessonAnswer,
  resetAnswers,
  resetQuizAnsers,
  updateUserProfile,
  updateUserKnowledge,
} = userSlice.actions;

export default userSlice.reducer;
