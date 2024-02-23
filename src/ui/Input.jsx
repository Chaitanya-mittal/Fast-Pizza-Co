function Input({
  type,
  placeholder,
  onChange,
  disabled,
  name,
  value,
  defaultV,
}) {
  if (value || onChange || placeholder) {
    return (
      <input
        type="type"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="transition:all  w-full rounded-full px-4 py-2 text-sm text-slate-500 duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      ></input>
    );
  }
  return (
    <input
      type={type}
      disabled={disabled}
      name={name}
      defaultValue={defaultV}
      required
      className="transition:all  w-full rounded-full px-4 py-2 
      text-sm 
      text-slate-500 duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  );
}

export default Input;
