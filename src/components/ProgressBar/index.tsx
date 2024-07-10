import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./index.module.scss";

interface IProps {
  step: number;
  onTimerFinished: () => void;
}
export default function LinearDeterminate({ step, onTimerFinished }: IProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    console.log({ stop });

    setProgress(-4);
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          onTimerFinished();
          return 100;
        }
        return oldProgress + 2;
      });
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, [step]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        className={styles.bar}
      />
    </Box>
  );
}
