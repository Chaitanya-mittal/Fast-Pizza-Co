import { NavLink } from "react-router-dom";

function Button({ disabled, children, to, type, click }) {
  const base = `inline-block  transition:colors duration:300  rounded-full bg-yellow-500 font-semibold uppercase tracking-wider  
  border-2 border-yellow-500
    hover:bg-yellow-400 hover:border-yellow-400  focus:outline-none focus:bg-yellow-400
    focus:ring focus:ring-yellow-300 focus:ring-offset-2     active:bg-yellow-600 
    disabled:cursor-not-allowed
    disabled:bg-yellow-600 `;

  const styles = {
    small: base + " px-3 py-2 text-xs  md:px-4 md:py-2",
    primary: base + " px-4 py-2  text-sm md:px-5 md:py-3  ",
    round: base + " h-8 w-8 ",
    secondary: `inline-block  transition:colors duration:300  rounded-full text-stone-400
    border-2 border-stone-300 font-semibold uppercase tracking-wider  
    hover:bg-stone-300 focus:bg-stone-300 focus:outline-none
    focus:ring focus:ring-stone-300 focus:ring-offset-2      active:bg-stone-400 
    disabled:cursor-not-allowed
    disabled:bg-stone-500 px-4 py-2 text-sm md:px-5 md:py-3  ml-2`,
  };
  if (to) {
    return (
      <NavLink to={to} className={styles[type]}>
        {children}
      </NavLink>
    );
  }
  return click ? (
    <button disabled={disabled} onClick={click} className={styles[type]}>
      {children}
    </button>
  ) : (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
