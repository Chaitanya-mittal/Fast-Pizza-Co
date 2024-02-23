import Button from "../../ui/Button";
import { useState } from "react";
import Input from "../../ui/Input";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../Services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getCartValue, clearCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress } from "../user/userSlice";
import store from "../../store";
import LinkButton from "../../ui/LinkButton";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const Navigation = useNavigation();
  const FormErrors = useActionData();
  const isSubmitting = Navigation.state === "submitting";
  const cart = useSelector(getCart);
  const {
    username,
    status: addressStatus,
    address: geoAddress,
    position: geoPosition,
    error: geoError,
  } = useSelector((state) => state.user);

  const CartValue = useSelector(getCartValue);
  const priorityValue = withPriority ? CartValue * 0.2 : 0;
  const paycheck = CartValue + priorityValue;
  const dispatch = useDispatch();
  const loadingStatus = addressStatus === "loading";

  if (cart.length === 0) return <EmptyCart />;

  function handleGetPosition() {
    dispatch(fetchAddress());
  }
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mb-12 mt-8 text-xl font-bold tracking-wide text-slate-800  sm:text-lg">
        Ready to order? Lets go!
      </h2>

      <Form method="POST" action="/order/new">
        <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:space-y-0">
          <label className="text-sm tracking-wide sm:basis-36 sm:text-base">
            First Name
          </label>
          <div className="grow">
            <Input type="text" name="customer" defaultV={username} />
          </div>
        </div>

        <div
          className={` mb-10 sm:flex  ${FormErrors?.phone ? "" : "sm:items-center"}`}
        >
          <label className="py-2 text-sm tracking-wide sm:basis-36 sm:text-base">
            Phone number
          </label>
          <div className="grow">
            <Input type="tel" name="phone" />
            {FormErrors?.phone && (
              <p className=" my-4 rounded-full bg-stone-200 px-4 py-2  text-xs tracking-wide text-red-900">
                {FormErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-10 sm:flex sm:items-center">
          <label className="text-sm tracking-wide sm:basis-36 sm:text-base ">
            Address
          </label>
          <div className="grow">
            <div className="flex grow gap-2">
              <div className="grow">
                <Input
                  type="text"
                  defaultV={geoAddress}
                  name="address"
                  disabled={loadingStatus}
                />
              </div>

              {!geoPosition.latitude &&
                !geoPosition.longitude && ( // remove after fetching the position
                  <Button
                    type="small"
                    disabled={loadingStatus}
                    click={handleGetPosition}
                  >
                    Get Position
                  </Button>
                )}
            </div>
            {addressStatus === "error" && (
              <p className=" my-4 rounded-full bg-stone-200 px-4 py-2  text-xs tracking-wide text-red-900">
                {geoError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-8 mt-12 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
          />
          <label className="text-stone-700" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />

          <input
            type="hidden"
            value={
              geoPosition?.longitude && geoPosition?.latitude
                ? `${geoPosition.latitude},${geoPosition.longitude}`
                : " "
            }
            name="geoPosition"
          />

          <Button disabled={isSubmitting || loadingStatus} type="primary">
            {" "}
            {isSubmitting ? "Placing Order.... " : `Order now from ${paycheck}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone = "Please Enter A  Valid Phone Number.";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder({
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
    position: data.position,
  });

  // //use very less of it as it causes performance issue
  store.dispatch(clearCart());
  // // as action is not a component , so we cant call the useDispatch hook

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
