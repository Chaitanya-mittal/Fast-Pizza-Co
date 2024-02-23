import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to Menu</LinkButton>
      <p className=" my-8 bg-stone-200 p-8 font-serif font-medium  text-red-500">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
