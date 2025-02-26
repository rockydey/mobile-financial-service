import UserSendMoney from "../../components/send-money/UserSendMoney";
import useUser from "../../hooks/auth/useUser";

function SendMoney() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = useUser();

  return (
    <>
      {(user?.role === "user" || user?.role === "agent") && <UserSendMoney />}
    </>
  );
}

export default SendMoney;
