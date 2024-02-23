import { Link } from "react-router-dom";
import Search from "./Search";
import Username from "../Features/User/Username";

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 px-2 py-4 sm:px-4">
      <Link to="/" className="text-sm uppercase tracking-widest sm:text-base">
        Fast-Pizza-Co
      </Link>
      <Search />
      <Username />
    </header>
  );
}

export default Header;
