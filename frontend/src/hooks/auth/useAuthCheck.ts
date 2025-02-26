/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetMeQuery } from "../../redux/slice/auth/authSlice";
import { loginState, logout } from "../../redux/slice/auth/auth-slice";

export interface AuthProps {
  isChecked: boolean;
  isLoading: boolean;
}

function useAuthCheck(): AuthProps {
  const dispatch = useDispatch();
  const [getMe] = useLazyGetMeQuery();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const authToken = localStorage.getItem("financial-auth-token");

    // If no authToken, skip API call and just log out
    if (!authToken) {
      dispatch(logout());
      setIsChecked(false);
      setIsLoading(false);
      return;
    }

    // If token exists, proceed with the getMe API call
    getMe(null)
      .unwrap()
      .then((res: any) => {
        dispatch(
          loginState({
            user: res?.data,
            token: authToken,
          })
        );
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        setIsChecked(false);
        setIsLoading(false);
      });
  }, [dispatch, getMe]);

  return { isChecked, isLoading };
}

export default useAuthCheck;
