import { useField } from "formik";
import React from "react";
import InputView, { Props } from "./Input_View";

const Input: React.FC<Props> = (props) => {
  const [field, meta] = useField(props as any);

  const error = meta.error && meta.touched ? meta.error : undefined;

  return <InputView {...props} {...field} error={error} />;
};

export default Input;
