import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/Cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();

  return (
    <section className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      {navigation.state === "loading" && <Loader />}

      <main className=" overflow-scroll ">
        <div className="mx-auto max-w-3xl px-4 py-4 ">
          <Outlet />
        </div>
      </main>
      <CartOverview />
    </section>
  );
}

export default AppLayout;
