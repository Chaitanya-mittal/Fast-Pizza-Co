import { useSelector } from "react-redux";
import { getUsername } from "./userSlice.js";

function Username() {
  const username = useSelector(getUsername);
  if (username === "") return null;
  return (
    <div className="hidden  text-sm font-bold uppercase tracking-wide sm:block">
      {username}
    </div>
  );
}

export default Username;
