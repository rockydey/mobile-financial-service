import { useAppSelector } from "../../redux/store/store";

const useUser = () => {
  const user = useAppSelector((state) => state.auth.user);
  return user;
};

export default useUser;
