import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { Box, Divider } from "@mui/material";
import SvgComponent from "../../assets/Mascut.tsx";
import { useAppSelector } from "../../hooks/redux.ts";

const Home = () => {
  const profile = useAppSelector((state) => state.user.profile);

  return (
    <div className={styles.container}>
      <Box className={styles.logo}>
        <SvgComponent />
      </Box>
      <h1>Learno</h1>
      <p className="read-the-docs">
        Let's improve your vocabulary knowledge together
      </p>
      <div className={styles.card}>
        {profile.token && (
          <Button variant="contained" fullWidth>
            <Link to="quiz">Take the quize</Link>
          </Button>
        )}

        <div className={styles.auth}>
          {!profile.token && (
            <>
              <Button variant="contained">
                <Link to="login">Register</Link>
              </Button>
              <div className={styles.divider}>
                <span>or</span>
                <Divider />
              </div>
              <Button variant="contained">
                <Link to="login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
