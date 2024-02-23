import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartSize, getCartValue } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
function CartOverview() {
  const cartQuantity = useSelector(getCartSize);
  const cartValue = useSelector(getCartValue);

  if (cartQuantity === 0) return null;
  return (
    <div className=" flex items-center justify-between bg-slate-950 px-4  py-4 text-xs uppercase sm:text-sm">
      <p className=" space-x-4 text-slate-100 md:space-x-6">
        <span>{cartQuantity} pizzas</span>
        <span className="border border-red-900 p-1">
          {formatCurrency(cartValue)}
        </span>
      </p>
      <Link
        to="/cart"
        className=" inline-block border-y-2 border-yellow-600/75 py-1 text-slate-100 "
      >
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
