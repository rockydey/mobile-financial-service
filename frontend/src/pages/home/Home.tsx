import UserHome from "../../components/home/UserHome";
import useUser from "../../hooks/auth/useUser";

function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = useUser();

  console.log(user);

  return (
    <>
      <UserHome />
    </>
  );
}

export default Home;
