import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className=" transition:all duration:500 w-28 rounded-full bg-yellow-100 px-4 py-2 text-xs text-slate-700 ease-in focus:outline-none 
        focus:ring focus:ring-yellow-400 sm:w-60 sm:text-sm sm:focus:w-72"
      ></input>
    </form>
  );
}

export default Search;
