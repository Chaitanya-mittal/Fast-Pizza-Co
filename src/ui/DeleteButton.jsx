import { useDispatch } from "react-redux";
import Button from "./Button";
import { deleteItem } from "../features/cart/cartSlice";

function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <Button type="small" click={handleDelete}>
      <i className="fa-solid fa-trash"></i>
    </Button>
  );
}

export default DeleteButton;
