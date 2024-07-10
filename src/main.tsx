import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Quiz from "./pages/Quiz/index.tsx";
import Lesson from "./pages/Lesson/index.tsx";
import LessonQuestions from "./pages/Lesson/Questions/index.tsx";
import ResultPage from "./pages/Lesson/result/index.tsx";
import Login from "./pages/Login/index.tsx";
import { getClientID } from "./Utils/configs.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/lesson",
    element: <Lesson />,
  },
  {
    path: "/lesson/questions",
    element: <LessonQuestions />,
  },
  {
    path: "/lesson/result",
    element: <ResultPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={getClientID}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
