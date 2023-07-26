import React from "react";

interface Props {
  className?: string;
  value?: any;
  placeholder?: string;
  onChange?: (e: any) => void;
  icon?: any;
}
const Textarea = (props: Props) => {
  return (
    <>
      <textarea
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className="rounded px-2 py-3 resize-none h-32 bg-gray-100"
      ></textarea>
    </>
  );
};

export default Textarea;
