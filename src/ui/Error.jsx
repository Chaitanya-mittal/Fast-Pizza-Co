import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="bg-stone-200 px-4 py-8 text-center">
      <h1 className="text-lg font-semibold sm:text-xl">
        Something went wrong 😢
      </h1>
      <p className="my-4 text-base text-red-600 sm:text-lg ">
        {error.data || error.message}
      </p>
      <LinkButton to={-1}>&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
