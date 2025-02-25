/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginState, logout } from "../../redux/slice/auth/auth-slice";

export interface AuthProps {
  isChecked: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  number: number;
  pin: number;
  role: string;
  nid: string;
  createdAt: string;
  updatedAt: string;
}

function useAuthCheck(): AuthProps {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(true);

  // Mocking the getMe API call
  const getMe = async (): Promise<{ data: User }> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const demoResponse = {
          user: {
            _id: "123456",
            name: "John Doe",
            email: "john.doe@example.com",
            number: 1234567890,
            pin: 1234,
            role: "admin",
            nid: "NID123456789",
            createdAt: "2025-02-24T00:00:00Z",
            updatedAt: "2025-02-24T00:00:00Z",
          },
          isLoggedIn: false,
          token: "--",
          pageTitle: "",
        };

        const isSuccess = true;

        if (isSuccess) {
          resolve({ data: demoResponse });
        } else {
          reject("Failed to fetch user data");
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const authToken = localStorage.getItem("financial-auth-token");

    if (!authToken) {
      dispatch(logout());
      setIsChecked(false);
      return;
    }

    getMe()
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
      });
  }, [dispatch]);

  return { isChecked };
}

export default useAuthCheck;
