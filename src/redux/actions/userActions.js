import axios from "axios";
import { SET_USER, SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from "../types";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      const FB_token = `Bearer ${res.data.token}`;

      localStorage.setItem("FB_token", FB_token);
      axios.defaults.headers.common["Authorization"] = FB_token;
      // setAuthorizationHeader(res.data.token);

      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserData = () => (dispatch) => {
  axios
    .get("/user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => console.error(err));
};
