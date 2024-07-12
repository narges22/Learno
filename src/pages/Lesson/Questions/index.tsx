import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import {
  checkAnswer,
  generateHint,
  generateQuestions,
  getFeedback,
  iconsData,
} from "./utils";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import styles from "./index.module.scss";
import { IFeedback, Ianswer, catIcon } from "./type";
import Question from "./Question";
import { setLessonQuestions } from "../../../store/Slices/lesson";
import { useDispatch } from "react-redux";
import loadingAnimation from "../../../assets/loading.svg";
import { ILessonAnswer } from "../../../store/Slices/types";
import {
  addLessonAnswer,
  resetAnswers,
  updateUserKnowledge,
} from "../../../store/Slices/user";
import axios from "axios";

const LessonQuestions = () => {
  const initialState = {
    icon: iconsData[catIcon.waiting],
    text: "choose your answer and I can help you!",
  };
  const vocabularies = useAppSelector((state) => state.lesson.vocabularies);
  const questions = useAppSelector((state) => state.lesson.questions);
  const lessonAnswers = useAppSelector((state) => state.user.lessonAnswers);
  const questionResults = useAppSelector((state) => state.user.lessonAnswers);
  const profile = useAppSelector((state) => state.user.profile);
  const [qNumber, setQNumer] = useState(0);
  const [feedback, setFeedback] = useState<IFeedback>(initialState);
  const [correct, setCorrect] = useState<Ianswer>(Ianswer.initial);
  const [loading, setLoading] = useState<boolean>(false);
  const [answerState, setAnswerState] = useState<ILessonAnswer>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (lessonAnswers.length > 0) {
      dispatch(resetAnswers());
    }
    if (questions.length === 0 && vocabularies) {
      dispatch(setLessonQuestions(generateQuestions(vocabularies)));
    }
  }, []);

  useEffect(() => {
    console.log(answerState);
  }, [answerState]);

  if (questions.length === 0) {
    return;
  }

  const onUpdateUserKnowledge = () => {
    const learned = questionResults
      .filter((r) => r.isCorrect && !r.withHint)
      .map((r) => r.word);

    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/update/knowledge`, learned, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${profile.token}`,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        dispatch(updateUserKnowledge(res.data.user.words));
        navigate("/lesson/result");
      });
  };

  const handleNext = () => {
    if (qNumber === questions?.length - 1) {
      onUpdateUserKnowledge();
    }
    console.log("here", answerState);
    setFeedback(initialState);
    setQNumer((qNumber) => qNumber + 1);
    if (answerState) {
      dispatch(addLessonAnswer(answerState));
      setAnswerState(undefined);
      setCorrect(Ianswer.initial);
    }
  };

  const onAnswer = (selectedAnswer: string) => {
    setCorrect(Ianswer.selected);
    setLoading(true);
    setTimeout(() => {
      const tmp = checkAnswer(questions?.[qNumber].word, selectedAnswer);
      setCorrect(tmp);
      let hint = undefined;
      if (tmp === Ianswer.inCorrect) {
        hint = generateHint(
          selectedAnswer,
          questions?.[qNumber].type,
          vocabularies
        );
      }
      setLoading(false);
      setAnswerState((prev) => {
        const newAttempts = prev?.attempts ? prev?.attempts + 1 : 1;
        return {
          word: questions?.[qNumber].word.word,
          attempts: newAttempts,
          isCorrect: tmp === Ianswer.correct,
          withHint: newAttempts > 1,
        };
      });
      setFeedback(getFeedback(tmp, hint));
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <header>
        <Typography className={styles.lesson}>
          Question {qNumber + 1}
        </Typography>
        <Typography>
          {qNumber + 1}/{vocabularies.length}
        </Typography>
      </header>
      <div>
        <Question
          data={questions?.[qNumber]}
          onAnswer={onAnswer}
          correct={correct}
        />
      </div>
      <footer>
        <div className={styles.footer}>
          <div className={styles.feedback}>
            <img src={feedback?.icon} alt="" />
            <span className={styles.arrowLeft}></span>
            <p>
              {loading ? (
                <div className={styles.loading}>
                  <img src={loadingAnimation} alt="loading" />
                </div>
              ) : (
                <>
                  {feedback.hint ? (
                    <>
                      <span className={styles.part1}>
                        {feedback.hint.part1}
                      </span>
                      <strong>{feedback.hint.part2}</strong>
                    </>
                  ) : (
                    feedback.text
                  )}
                </>
              )}
            </p>
          </div>
          <div className={styles.buttons}>
            <div></div>
            {/* <Button variant="contained" onClick={handlePrev}>
              Previous
            </Button> */}
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LessonQuestions;
