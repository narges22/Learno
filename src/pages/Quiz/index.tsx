import axios from "axios";
import Button from "@mui/material/Button";
import styles from "./index.module.scss";
import { useAppSelector } from "../../hooks/redux";
import LinearDeterminate from "../../components/ProgressBar";
import { useEffect, useMemo, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { Box, FormControlLabel, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addAnswer,
  resetQuizAnsers,
  updateUserKnowledge,
} from "../../store/Slices/user";
import { setquizWords, setQuizQuestions } from "../../store/Slices/quiz";
import successAnimation from "../../assets/success.json";
import { default as Lottie } from "lottie-react";
import { extractquestions } from "./utils";
import { getTitle } from "../Lesson/Questions/Question";
import { checkAnswerBoolean } from "../Lesson/Questions/utils";
import { Link } from "react-router-dom";
import { getUserKnowledge } from "../../Utils";

const Quiz = () => {
  const questions = useAppSelector((state) => state.quiz.questions);
  const quizWords = useAppSelector((state) => state.quiz.words);
  const userAnswers = useAppSelector((state) => state.user.quizAnswers);
  const profile = useAppSelector((state) => state.user.profile);

  const dispatch = useDispatch();
  const [step, setStep] = useState<number>(1);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>();
  // userAnswers.length > 0 ? true : false

  const totalSteps = questions.length;
  const question = useMemo(() => questions[step - 1], [step, questions]);

  console.log({ userAnswers });
  useEffect(() => {
    // if (userAnswers) {
    //   dispatch(resetQuizAnsers());
    // }
    if (quizWords.length === 0) {
      fetchQuizData().then((data) => {
        dispatch(setQuizQuestions(extractquestions(data)));
      });
    }
  }, []);

  useEffect(() => {
    if (timeUp) {
      handleNextStep();
    }
  }, [timeUp, answer]);

  useEffect(() => {
    const updateDB = (payload: string[]) => {
      axios
        .post(`${import.meta.env.VITE_APP_API_URL}/update/knowledge`, payload, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${profile.token}`,
          },
        })
        .then((res: any) => {
          console.log(res.data.user.words);
          dispatch(updateUserKnowledge(res.data.user.words));
        });
    };
    if (showSuccess) {
      console.log("injooo", getUserKnowledge(userAnswers));
      const finalWords = getUserKnowledge(userAnswers);
      updateDB(finalWords);
    }
  }, [showSuccess]);

  const fetchQuizData = () => {
    return axios
      .get(`${import.meta.env.VITE_APP_API_URL}/getQuiz`)
      .then(function (response) {
        console.log(response);
        dispatch(setquizWords(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  };

  if (!questions || !question) {
    return;
  }

  const handleNextStep = () => {
    if (answer) {
      dispatch(
        addAnswer({
          answer,
          questionType: question.type,
          questionId: question.id || "",
          word: question.word,
          isCorrect: checkAnswerBoolean(question.word, answer),
        })
      );
    }
    if (step === totalSteps) {
      setShowSuccess(true);
      return;
    }
    setAnswer(undefined);
    setTimeUp(false);
    setStep((prev) => {
      return prev + 1;
    });
  };

  const onSelectAnswer = (e: any) => {
    setAnswer(e.target.value);
  };

  const onTimeUp = () => {
    setTimeUp(true);
  };

  if (showSuccess) {
    return (
      <div className={styles.container}>
        <Lottie animationData={successAnimation} loop={true} />
        <Button variant="contained" className={styles.full} fullWidth>
          <Link to="/lesson">let's start the first lesson</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LinearDeterminate step={step} onTimerFinished={onTimeUp} />
      <div className={styles.main}>
        <Box py={2}>{`${step}/${totalSteps}`}</Box>
        <>
          <Typography sx={{ pb: 2 }}>
            {`${question?.title} `}
            <b>{getTitle(question)} </b>
          </Typography>
          <div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={onSelectAnswer}
            >
              {question?.answers.map((a) => (
                <div>
                  <FormControlLabel value={a} control={<Radio />} label={a} />
                </div>
              ))}
            </RadioGroup>
          </div>
        </>
      </div>
      <div className={styles.footer}>
        {step === totalSteps && timeUp ? (
          <Button variant="contained" className={styles.full}>
            <Link to="/lesson">let's start</Link>
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={handleNextStep}
              disabled={!answer}
            >
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Quiz;
