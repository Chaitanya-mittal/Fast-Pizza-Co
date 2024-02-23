import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-xs md:text-sm">
        👋 Welcome! Please start by telling us your name:
      </p>

      <Input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div className="mt-8">
          <Button type="primary">Start Ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
