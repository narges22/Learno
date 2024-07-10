import { useMemo } from "react";
import catClever from "../../../assets/cat/clever.svg";
import { useAppSelector } from "../../../hooks/redux";
import styles from "./index.module.scss";
import { Typography } from "@mui/material";

const ResultPage = () => {
  const questionResults = useAppSelector((state) => state.user.lessonAnswers);
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
  return (
    <div className={styles.main}>
      <h3>Congratulations!</h3>
      <div className={styles.image}>
        <img src={catClever} alt="clever" />
      </div>
      <div>
        <div className={styles.learned}>
          <Typography>You've learned these words without any help</Typography>
          {analysedResult.learned.map((data) => (
            <span>{`${data.word} `}</span>
          ))}
        </div>
        <div className={styles.learnedWithHelp}>
          <Typography>Learned with some hint</Typography>
          {analysedResult.learnedWithHelp.map((data) => (
            <span>{`${data.word} `}</span>
          ))}
        </div>
        <div className={styles.remaining}>
          <Typography>we can practise these ones more</Typography>
          {analysedResult.remaining.map((data) => (
            <span>{`${data.word} `}</span>
          ))}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ResultPage;
