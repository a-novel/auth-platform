import css from "./login.module.css";

import { FC } from "react";

import { LoginForm as LoginFormType } from "@/api";
import { FormAsyncValidateOrFn, FormValidateOrFn, ReactFormExtendedApi } from "@tanstack/react-form";
import { Translation } from "react-i18next";
import { z } from "zod";

export interface LoginFormProps<
  TOnMount extends undefined | FormValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnChange extends undefined | FormValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnChangeAsync extends undefined | FormAsyncValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnBlur extends undefined | FormValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnBlurAsync extends undefined | FormAsyncValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnSubmit extends undefined | FormValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnSubmitAsync extends undefined | FormAsyncValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnServer extends undefined | FormAsyncValidateOrFn<z.infer<typeof LoginFormType>>,
  TSubmitMeta,
> {
  form: ReactFormExtendedApi<
    z.infer<typeof LoginFormType>,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnServer,
    TSubmitMeta
  >;
  onSubmit: (form: z.infer<typeof LoginFormType>) => void;
  isSubmitting?: boolean;
}

export const LoginForm = <
  TOnMount extends undefined | FormValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnChange extends undefined | FormValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnChangeAsync extends undefined | FormAsyncValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnBlur extends undefined | FormValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnBlurAsync extends undefined | FormAsyncValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnSubmit extends undefined | FormValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnSubmitAsync extends undefined | FormAsyncValidateOrFn<z.infer<typeof LoginFormType>>,
  TOnServer extends undefined | FormAsyncValidateOrFn<z.infer<typeof LoginFormType>>,
  TSubmitMeta,
>({
  form,
  isSubmitting,
  onSubmit,
}: LoginFormProps<
  TOnMount,
  TOnChange,
  TOnChangeAsync,
  TOnBlur,
  TOnBlurAsync,
  TOnSubmit,
  TOnSubmitAsync,
  TOnServer,
  TSubmitMeta
>) => (
  <div className={css.card}>
    <h1>
      <Translation ns="login">{(t) => t("login:title")}</Translation>
    </h1>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit().catch(console.error);
      }}
    >
      <form.Field name="email">
        {(field) => (
          <>
            <label htmlFor={field.name}></label>
            <input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </>
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <>
            <label htmlFor={field.name}></label>
            <input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </>
        )}
      </form.Field>
    </form>
  </div>
);
