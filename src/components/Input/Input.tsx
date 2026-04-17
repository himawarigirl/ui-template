import React, { forwardRef, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import "../../styles/typography.scss";
import styles from "./Input.module.scss";
import Button from "../Button/Button";

import { SuccessIcon, AlertIcon, SearchIcon } from "../../assets/icons";

export type InputState = "default" | "success" | "error" | "search";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  state?: InputState;
  size?: "sm" | "md" | "lg";
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  fullWidth?: boolean;
  onSearch?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    state = "default",
    size = "md",
    label,
    hint,
    error,
    success,
    className,
    fullWidth = false,
    id,
    disabled,
    value: controlledValue,
    onChange,
    onSearch,
    ...rest
  },
  ref
) {
  const [internalValue, setInternalValue] = useState("");

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const inputId =
    id ??
    (label ? `input-${Math.random().toString(36).slice(2, 9)}` : undefined);

  const message = error ?? (state === "success" ? success : hint);
  const describedBy = message ? `${inputId}-message` : undefined;

  const isSearch = state === "search";
  const hasValue = isSearch && value?.toString().length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(value?.toString() ?? "");
    }
  };

  const renderRight = () => {
    if (state === "search") {
      if (hasValue) {
        return <Button variant="tertiary">Найти</Button>;
      }
      return <SearchIcon />;
    }

    if (state === "success") return <SuccessIcon />;
    if (state === "error") return <AlertIcon />;

    return null;
  };

  const hasRight = state !== "default";

  return (
    <div className={clsx(styles.wrapper, fullWidth && styles.fullWidth)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={clsx(styles.field, styles[state])}>
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isSearch) {
              handleSearch();
            }
          }}
          className={clsx(
            styles.input,
            styles[size],
            disabled && styles.disabled,
            hasRight && styles.withIcon,
            "text-small",
            className
          )}
          aria-invalid={state === "error"}
          aria-describedby={describedBy}
          {...rest}
        />

        {hasRight && <div className={styles.right}>{renderRight()}</div>}
      </div>

      {message && (
        <div
          id={`${inputId}-message`}
          className={clsx(
            styles.message,
            state === "error" && styles.error,
            state === "success" && styles.success
          )}
          role={state === "error" ? "alert" : undefined}
        >
          {message}
        </div>
      )}
    </div>
  );
});

export default Input;
