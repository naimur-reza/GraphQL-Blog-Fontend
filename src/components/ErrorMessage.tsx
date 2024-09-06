import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return <p className="text-rose-500 font-medium">{children}</p>;
};

export default ErrorMessage;
