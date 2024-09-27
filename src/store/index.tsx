import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import quizReducer from "./Slices/quiz";
import userReducer from "./Slices/user";
import lessonReducer from "./Slices/lesson";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "lesson"],
};

const rootReducer = combineReducers({
  quiz: quizReducer,
  user: userReducer,
  lesson: lessonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
