import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { clearCart, getCart } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mb-6 mt-8 text-xl font-semibold tracking-wider text-slate-700">
        Your cart, {username}{" "}
      </h2>
      <ul className="divide-y divide-slate-300">
        {cart.map((cartItem) => {
          return <CartItem key={cartItem.pizzaId} item={cartItem} />;
        })}
      </ul>
      <div className="mt-8">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" click={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
