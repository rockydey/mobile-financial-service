import UserCaseOut from "../../components/case-out/UserCaseOut";
import useUser from "../../hooks/auth/useUser";

function CaseOut() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = useUser();

  return <>{user?.role === "user" && <UserCaseOut />}</>;
}

export default CaseOut;
