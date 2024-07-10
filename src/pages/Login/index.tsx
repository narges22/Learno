import { Typography } from "@mui/material";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";
import styles from "./index.module.scss";
import catClever from "../../assets/cat/clever.svg";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/Slices/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse: any) => {
      axios
        .post(
          `${import.meta.env.VITE_APP_API_URL}/auth/login`,
          { access_token: credentialResponse.credential },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res: any) => {
          console.log(res.data);

          if (res.data) {
            dispatch(
              updateUserProfile({
                name: res.data.name,
                surname: res.data.surname,
                token: credentialResponse.credential,
                email: res.data.email,
                userKnowledge: res.data.words,
              })
            );
            navigate("/");
          }
        });
    },
  });
  return (
    <div className={styles.main}>
      <Typography>Register Or Login</Typography>
      <img src={catClever} alt="clever" />
      <Typography component="h5">Welcome to Learno!</Typography>

      {/* <Button className={styles.button}>
        <img src={google} alt="googleIcon" />
        Login With Google
      </Button> */}
    </div>
  );
};
export default Login;
