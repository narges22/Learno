import { FC } from "react";
import { IWord } from "../../../store/Slices/types";
import styles from "./index.module.scss";
import { Typography } from "@mui/material";
import BookMarkComponent from "../../../assets/BookBookmark";
import PenSvgComponent from "../../../assets/Pen";

interface IProps {
  data: IWord;
}
const Word: FC<IProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className={styles.wordContaier}>
      <Typography className={styles.word}>
        {`${data.word}`}
        <span>{`(${data.partOfSpeach})`}</span>
      </Typography>

      <div className={styles.meaning}>
        <Typography>{data.meaning}</Typography>
      </div>

      <div className={styles.academicSyn}>
        <div className={styles.icon}>
          <BookMarkComponent />
        </div>
        <div>
          <span>Academic Synonym:</span>
          <Typography>{data.academicSynonym}</Typography>
        </div>
      </div>

      <div className={styles.example}>
        <div>
          <div className={styles.icon}>
            <PenSvgComponent />
          </div>
        </div>
        <div>
          <span>Example:</span>
          <Typography>{data.example}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Word;
