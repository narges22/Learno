import { FC, useState } from "react";
import { Ianswer, LQuestionTypesEnum, LessonQuestion } from "../type";
import { Box, Typography } from "@mui/material";
import styles from "./index.module.scss";
import clsx from "clsx";

interface IProps {
  data: LessonQuestion;
  onAnswer: (a: string) => void;
  correct?: boolean | string;
}

export const getTitle = (data: LessonQuestion) => {
  switch (data?.type) {
    case LQuestionTypesEnum.MeaningWord:
      return data.word.meaning;
    case LQuestionTypesEnum.WordMeaning:
    case LQuestionTypesEnum.WordAcademic:
      return data.word.word;
    case LQuestionTypesEnum.AcademicWord:
      return data.word.academicSynonym;
  }
};

const Question: FC<IProps> = ({ data, correct, onAnswer }) => {
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const onSelectAnswer = (e: string) => {
    setAnswer(e);
    onAnswer(e);
  };
  console.log("inside answer", correct);
  return (
    <div className={styles.main}>
      <Typography sx={{ pb: 2 }}>
        {`${data.title} `}
        <b>{getTitle(data)} </b>
      </Typography>
      <div>
        {data.answers.map((a) => (
          <Box
            className={clsx(
              styles.questionBox,
              answer === a && correct === Ianswer.selected && styles.selected,
              answer === a && correct === Ianswer.correct && styles.correct,
              answer === a && correct === Ianswer.inCorrect && styles.inCorrect
            )}
            key={a}
            onClick={() => onSelectAnswer(a)}
          >
            {a}
          </Box>
        ))}
      </div>
    </div>
  );
};
export default Question;
