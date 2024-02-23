// Test ID: IIDSAT
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../../Services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import LinkButton from "../../ui/LinkButton";
import { useEffect } from "react";
import Button from "../../ui/Button";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  // console.log(order);
  const fetcher = useFetcher();
  const {
    data: {
      id,
      status,
      priority,
      priorityPrice,
      orderPrice,
      estimatedDelivery,
      cart,
    },
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
      // calls the loader associated with the menu router and stores the data in the  fetcher.data
    }
  }, [fetcher]);

  return (
    <div className="mt-8">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <div className="mb-4 mt-8 flex flex-wrap items-center  justify-between gap-4">
        <h2 className=" text-2xl font-bold capitalize tracking-wide sm:text-3xl ">
          Order #{id} Status
        </h2>

        <div className="flex flex-wrap gap-2 font-semibold text-white">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-2 text-xs  uppercase tracking-wider">
              Priority
            </span>
          )}
          <span className="rounded-full  bg-green-500 px-3 py-2 text-xs uppercase tracking-wider">
            {" "}
            {status} order
          </span>
        </div>
      </div>

      <div className="my-10 flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-4 py-8">
        <p className="text-lg font-bold tracking-wide">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm tracking-wide text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="my-10 divide-y divide-slate-200 border-b border-t">
        {cart.map((item) => {
          return (
            <OrderItem
              key={item.pizzaId}
              item={item}
              isLoadingIngredients={fetcher?.state === "loading"}
              ingredients={
                fetcher?.data
                  ? fetcher.data.find((el) => el.id === item.pizzaId)
                      .ingredients
                  : []
              }
            />
          );
        })}
      </ul>

      <div className="my-10 space-y-2 bg-stone-200 px-4 py-8">
        <p className="text-sm text-stone-500  sm:text-base">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm text-stone-500  sm:text-base">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-base font-bold sm:text-lg">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {/* // since this does some extra function as rest it only displaying we can create a separate component for this , Good practice*/}
      {!priority && (
        <fetcher.Form method="POST">
          <Button type="small">Make Priority</Button>
        </fetcher.Form>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderID);
  return order;
}
export default Order;

export async function action({ request, params }) {
  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData);
  console.log(formEntries);
  console.log(params.orderID);
  await updateOrder(params.orderID, { priority: true });
  return null;
}
