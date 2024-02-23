import { formatCurrency } from "../../utils/helpers";
import DeleteButton from "../../ui/DeleteButton";
import QuantitySelector from "../../ui/QuantitySelector";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between ">
      <p className="mb-2 text-base tracking-wider sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between text-slate-700 sm:justify-normal sm:gap-4">
        <p className="text-sm font-bold tracking-wide">
          {formatCurrency(totalPrice)}
        </p>
        <QuantitySelector quantity={quantity} pizzaId={pizzaId} />
        <DeleteButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
