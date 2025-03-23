import css from "./input_text.module.css";

import { ComponentProps, FC, ReactNode } from "react";

export interface InputTextProps extends ComponentProps<"input"> {
  /**
   * Status used to decorate the input.
   */
  status?: "success" | "error" | "loading" | "neutral";
  /**
   * Adornment to be placed at the start of the input. It can be a fragment listing multiple adornments.
   */
  startAdornment?: ReactNode;
  /**
   * Adornment to be placed at the end of the input. It can be a fragment listing multiple adornments.
   */
  endAdornment?: ReactNode;
  wrapperProps?: ComponentProps<"div">;
}

export const InputText: FC<InputTextProps> = ({
  wrapperProps: { className, ...wrapperProps } = {},
  status,
  startAdornment,
  endAdornment,
  ...props
}) => (
  <div data-status={status ?? "neutral"} className={`${css.input} ${className ?? ""}`} {...wrapperProps}>
    {startAdornment}
    <input {...props} />
    {endAdornment}
  </div>
);
