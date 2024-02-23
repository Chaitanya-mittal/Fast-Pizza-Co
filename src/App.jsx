import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./UI/Home";
import Menu, { loader as menuLoader } from "./Features/Menu/Menu";
import Cart from "./Features/Cart/Cart";
import Order, {
  loader as OrderLoader,
  action as UpdateOrderAction,
} from "./Features/Order/Order";
import CreateOrder, {
  action as CreateOrderAction,
} from "./Features/Order/CreateOrder";
import AppLayout from "./UI/AppLayout";
import Error from "./UI/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/", //index route
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
        loader: menuLoader, //2.Providing the loader function
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/new",
        element: <CreateOrder />,
        action: CreateOrderAction,
      },
      {
        path: "order/:orderID",
        element: <Order />,
        loader: OrderLoader,
        action: UpdateOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
