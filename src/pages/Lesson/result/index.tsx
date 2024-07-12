import { useMemo } from "react";
import catClever from "../../../assets/cat/clever.svg";
import { useAppSelector } from "../../../hooks/redux";
import styles from "./index.module.scss";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetLesson } from "../../../store/Slices/lesson";

const ResultPage = () => {
  const questionResults = useAppSelector((state) => state.user.lessonAnswers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const analysedResult = useMemo(() => {
    const learned = questionResults.filter((r) => r.isCorrect && !r.withHint);
    const learnedWithHelp = questionResults.filter(
      (r) => r.isCorrect && r.withHint
    );
    const remaining = questionResults.filter((r) => !r.isCorrect);
    return {
      learned,
      learnedWithHelp,
      remaining,
    };
  }, [questionResults]);

  const navigateToNExtLevel = () => {
    dispatch(resetLesson());
    navigate("/lesson");
  };
  return (
    <div className={styles.main}>
      <h3>Congratulations!</h3>
      <div className={styles.image}>
        <img src={catClever} alt="clever" />
      </div>
      <div>
        <div className={styles.learned}>
          <Typography>You've learned these words without any help</Typography>
          {analysedResult.learned.map((data, index) => (
            <span>{`${data.word} ${
              analysedResult.learned.length > index + 1 ? "/" : ""
            } `}</span>
          ))}
          {analysedResult.learned.length === 0 && "no words"}
        </div>
        <div className={styles.learnedWithHelp}>
          <Typography>Learned with some hint</Typography>
          {analysedResult.learnedWithHelp.map((data) => (
            <span>{`${data.word} `}</span>
          ))}
          {analysedResult.learnedWithHelp.length === 0 && "No words"}
        </div>
        <div className={styles.remaining}>
          <Typography>we can practise these ones more</Typography>
          {analysedResult.remaining.map((data) => (
            <span>{`${data.word} `}</span>
          ))}
          {analysedResult.remaining.length === 0 && "No words"}
        </div>

        <div className={styles.actionBox}>
          <Button onClick={navigateToNExtLevel}>jump to next level</Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
