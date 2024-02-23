import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentItemQuantity } from "../Cart/cartSlice";
import DeleteButton from "../../ui/DeleteButton";
import QuantitySelector from "../../ui/QuantitySelector";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const itemQuantity = useSelector(getCurrentItemQuantity(id));
  const dispatch = useDispatch();

  function handleAddToCart() {
    const newItem = {
      name,
      unitPrice,
      pizzaId: id,
      totalPrice: unitPrice * 1,
      quantity: 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li
      className={`flex gap-3 py-3 sm:py-2 ${soldOut ? `opacity-50 grayscale` : ``}`}
    >
      <img src={imageUrl} alt={name} className=" w-24  sm:w-40" />
      <div className="flex grow flex-col ">
        <p className="text-sm font-bold uppercase tracking-widest sm:text-lg">
          {name}
        </p>
        <p className="font-serif text-xs italic text-stone-400 sm:text-sm">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto">
          {!soldOut ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 ">
              <p className="text-sm sm:text-base">
                {formatCurrency(unitPrice)}
              </p>
              {itemQuantity > 0 && (
                <div className="flex flex-wrap gap-2">
                  <QuantitySelector pizzaId={id} quantity={itemQuantity} />
                  <DeleteButton pizzaId={id} />
                </div>
              )}
              {itemQuantity === 0 && (
                <div>
                  <Button type="small" click={handleAddToCart}>
                    Add
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm uppercase sm:text-base">Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
