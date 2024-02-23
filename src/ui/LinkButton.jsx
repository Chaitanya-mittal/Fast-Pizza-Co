import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function LinkButton({ to, children }) {
  const class_name = `text-sm text-sky-600 hover:text-sky-700 tracking-wider hover:underline`;
  const navigate = useNavigate();
  if (to === -1)
    return (
      <button onClick={() => navigate(-1)} className={class_name}>
        {children}
      </button>
    );
  return (
    <NavLink className={class_name} to={to}>
      {children}
    </NavLink>
  );
}

export default LinkButton;
