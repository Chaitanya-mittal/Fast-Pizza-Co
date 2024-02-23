import { useSelector } from "react-redux";
import CreateUser from "../features/User/CreateUser";
import Button from "./Button";
function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="p-8 text-center sm:p-16">
      <h1 className="mb-12 flex flex-col">
        <span className=" font-serif text-3xl font-bold text-stone-950 sm:text-5xl">
          The best pizza.
        </span>
        <span className="mt-4  text-xl font-semibold text-yellow-500 sm:text-3xl">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue Ordering , {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
