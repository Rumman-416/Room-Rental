import { login } from "../redux/AuthSlice/authSlice";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();

  const checkLocalStorage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        const userId = decodedToken.userId;
        dispatch(login({ userId }));
      }
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  return { checkLocalStorage };
};

export default useAuth;
