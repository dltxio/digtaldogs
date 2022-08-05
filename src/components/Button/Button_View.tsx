import * as React from "react";
import classnames from "classnames";
import { Loader } from "..";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<Props> = (props) => {
  const { className, title, loading, disabled, ...restOfProps } = props;
  return (
    <button
      className={classnames(
        className,
        `font-bold h-10 px-4 py-1 focus:outline-none`,
        { "opacity-50": disabled },
        { "hover:bg-secondary-cyan hover:text-black": !disabled }
      )}
      disabled={loading || disabled}
      {...restOfProps}
    >
      {loading ? <Loader className="text-lg" /> : title || props.children}
    </button>
  );
};

export default Button;
