import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-base tracking-wide sm:text-lg">
            <span className="text-sm font-semibold">{quantity}&times;</span>{" "}
            {name}
          </p>
          <p className="mt-2 text-sm italic tracking-wide text-stone-400">
            {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
          </p>
        </div>

        <p className="text-sm font-bold sm:text-base">
          {formatCurrency(totalPrice)}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
