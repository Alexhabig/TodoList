import React from "react";
interface Props {
  type?: "text" | "email" | "password" | "number";
  className?: string;
  value?: any;
  placeholder?: string;
  onChange?: (e: any) => void;
  icon?: any;
  req?: any;
}
const Input = (props: Props) => {
  return (
    <>
      <input
        required={props.req}
        type={props.type}
        className={`${props.className} w-full px-2 py-3 rounded bg-gray-100`}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </>
  );
};

export default Input;
