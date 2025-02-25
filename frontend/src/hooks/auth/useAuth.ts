import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

/**
 * @description this hook handles the logic for checking if the user is authenticated
 */
function useAuth() {
  // * get the auth state from redux store
  const { isLoggedIn, token } = useSelector((state: RootState) => state.auth);

  // * return the auth state
  if (isLoggedIn && token) return true;
  else return false;
}

// * export the custom hook
export default useAuth;
