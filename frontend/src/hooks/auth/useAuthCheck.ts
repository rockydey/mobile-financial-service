import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetMeQuery } from "../../redux/slice/auth/authSlice";
import { loginState, logout } from "../../redux/slice/auth/auth-slice";

/**
 * @description Custom hook to check if authentication is done
 * @returns {} isLoggedIn
 */

export interface AuthProps {
  isChecked: boolean;
}

function useAuthCheck(): AuthProps {
  // * action dispatcher
  const dispatch = useDispatch();
  const [getMe, { isLoading }] = useLazyGetMeQuery();

  // * get user id from cookie
  const authToken = localStorage.getItem("financial-auth-token");

  //* token do not exits
  if (!authToken) {
    dispatch(logout());
  }

  // * authentication check status
  const [isChecked, setIsChecked] = useState(false);

  // * check authentication status
  useEffect(() => {
    setIsChecked(true);
    getMe(null)
      .unwrap()
      .then((res) => {
        setIsChecked(false);
        dispatch(
          loginState({
            user: res?.data,
            token: authToken,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("financial-auth-token");
        setIsChecked(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // * return the authentication check status
  return { isChecked };
}

export default useAuthCheck;
