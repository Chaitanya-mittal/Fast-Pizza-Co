import { useDispatch } from "react-redux";
import Button from "./Button";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../features/cart/cartSlice";

function QuantitySelector({ quantity, pizzaId }) {
  const dispatch = useDispatch();
  function handleIncrement() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleDecrement() {
    dispatch(decreaseItemQuantity(pizzaId));
  }
  return (
    <div className="flex items-center gap-2">
      <Button type="round" click={handleIncrement}>
        +
      </Button>
      <p className="text-sm font-semibold">{quantity}</p>
      <Button type="round" click={handleDecrement}>
        -
      </Button>
    </div>
  );
}

export default QuantitySelector;
