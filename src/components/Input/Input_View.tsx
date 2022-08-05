import * as React from "react";

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  outerDivClassName?: string;
};

const InputView: React.FC<Props> = (props) => {
  const { className, error, outerDivClassName, ...restOfProps } = props;

  const content = (
    <>
      <input
        className={`${className} w-full h-12 mt-4 p-1 px-3 bg-background-light border-2 border-solid border-other-gray rounded-2xl outline-none focus:border-purple-electric`}
        {...restOfProps}
      />
      {props.error && (
        <div className="w-full bg-purple-electric p-1 my-1 rounded-xl text-center mt-2 text-white">
          {error}
        </div>
      )}
    </>
  );

  if (props.outerDivClassName) {
    return <div className={`${props.outerDivClassName}`}>{content}</div>;
  } else {
    return <div>{content}</div>;
  }
};

export default InputView;
