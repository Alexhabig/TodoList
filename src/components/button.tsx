interface Props {
  onClick?: () => void;
  text?: string;
  classname?: string;
  disable?: boolean;
  icon?: any;
  value?: any;
  type?: any;
}

const Button = (props: Props) => {
  return (
    <>
      <button
        className={`${props.classname} flex items-center gap-2 py-2 justify-center rounded-sm`}
        onClick={props.onClick}
        type={props.type}
        disabled={props.disable}
      >
        {props.icon}
        {props.text}
      </button>
    </>
  );
};

export default Button;
