import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../Services/apiRestaurant";
import MenuItem from "./MenuItem";
function Menu() {
  const menu = useLoaderData(); //3. to get hold of the data;
  return (
    <ul className="divide-y divide-slate-300">
      {menu.map((item) => {
        return <MenuItem key={item.id} pizza={item} />;
      })}
    </ul>
  );
}

export async function loader() {
  //1. to make a function to fetch the data
  const menu = await getMenu();
  return menu;
}
export default Menu;
