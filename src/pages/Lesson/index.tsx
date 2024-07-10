import { Link, useParams } from "react-router-dom";
import Word from "./Word";
import { IWord, QuizAnswer } from "../../store/Slices/types";
import { Button, Typography } from "@mui/material";
import styles from "./index.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import successAnimation from "../../assets/success.json";
import axios, { CancelTokenSource } from "axios";
import { useDispatch } from "react-redux";
import { setLessonWords } from "../../store/Slices/lesson";

const Lesson = () => {
  const { lesson } = useParams();
  const vocabularies = useAppSelector((state) => state.lesson.vocabularies);
  const [step, setStep] = useState<number>(0);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const userAnswers = useAppSelector((state) => state.user.quizAnswers);
  const profile = useAppSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const hasCalled = useRef<boolean>(false);

  useEffect(() => {
    if (vocabularies.length > 0) return;
    const source = axios.CancelToken.source();
    if (!hasCalled.current) {
      hasCalled.current = true;
      console.log("injaaaa", userAnswers);
      getLevelData(userAnswers, source);
    }
  }, []);

  if (!vocabularies) {
    return null;
  }

  const getLevelData = (
    userAnswers: QuizAnswer[],
    source: CancelTokenSource
  ) => {
    const payload = userAnswers.reduce((result, item) => {
      if (item.isCorrect && item.word.word) {
        // @ts-ignore
        result.push(item.word.word);
      }
      return result;
    }, []);

    console.log({ payload });
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/getnextlevel`, payload, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${profile.token}`,
        },
        cancelToken: source.token,
      })
      .then((res: any) => {
        console.log(res.data);
        dispatch(setLessonWords(res.data.nextLevel.words as IWord[]));
      });
  };

  const handleNext = () => {
    if (step === vocabularies?.length - 1) {
      setShowCongrats(true);
      return;
    }
    setStep((step) => step + 1);
  };

  const handlePrev = () => {
    if (step === 0) return;
    setStep((step) => step - 1);
  };

  if (showCongrats) {
    return (
      <div className={styles.congrats}>
        <Lottie animationData={successAnimation} loop={true} />
        <Typography>You have learned 5 vacabularies in this lesson</Typography>
        <Button variant="contained" className={styles.full} fullWidth>
          <Link to="/lesson/questions">let's dig deeper</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header>
        <Typography className={styles.lesson}>Lesson {lesson}</Typography>
        <Typography>
          {step + 1}/{vocabularies.length}
        </Typography>
      </header>
      <Word data={vocabularies[step] as unknown as IWord} />
      <div className={styles.buttons}>
        <Button variant="contained" onClick={handlePrev}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
export default Lesson;

const Isolated = () => {};
