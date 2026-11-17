import { forwardRef } from "react";
import { Link } from "react-router";

import { cn } from "@/utils/clsx";

import { buttonVariants, iconButtonVariants } from "./buttonVariants";

/* Shared base styles */
const baseStyles =
  "inline-flex items-center justify-center gap-2 " +
  "rounded-lg font-semibold transition-colors duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50";

/* Regular button styles */
const buttonBaseStyles =
  "min-h-10 px-5 py-2.5 2xl:py-4.5 2xl:px-6 text-sm 2xl:text-lg";

/* Icon button styles */
const iconButtonBaseStyles =
  "size-10 md:size-11 2xl:size-14 shrink-0 p-2 text-xl 2xl:text-2xl";

/* Find the requested variant */
// function getVariant(variants, variant) {
//   const selectedVariant = variants.find((item) => item.name === variant);

//   return selectedVariant?.className ?? variants[0].className;
// }

/* Shared implementation */
const ButtonBase = forwardRef(function ButtonBase(
  {
    variant = "primary",
    buttonType = "button",
    to,
    href,
    className,
    children,
    disabled = false,
    loading = false,
    active = false,
    onClick,
    isIconButton = false,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;

  /* Select the appropriate variant array */
  const variants = isIconButton ? iconButtonVariants : buttonVariants;

  const selectedVariant =
    variants.find((item) => item.name === variant) ?? variants[0];

  const classes = cn(
    baseStyles,
    isIconButton ? iconButtonBaseStyles : buttonBaseStyles,
    selectedVariant.className,
    active && selectedVariant.activeClassName,
    isDisabled && "cursor-not-allowed",
    className,
  );

  /* Handle clicks and disabled states */
  const handleClick = (event) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  /* Loading indicator */
  const content = (
    <>
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}

      {children}
    </>
  );

  /* Anchor: href takes priority */
  if (href !== undefined) {
    return (
      <a
        {...props}
        ref={ref}
        href={isDisabled ? undefined : href}
        className={classes}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : props.tabIndex}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  /* React Router Link */
  if (to !== undefined) {
    return (
      <Link
        {...props}
        ref={ref}
        to={isDisabled ? "#" : to}
        className={classes}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : props.tabIndex}
        onClick={handleClick}
      >
        {content}
      </Link>
    );
  }

  /* Native button */
  return (
    <button
      {...props}
      ref={ref}
      type={buttonType}
      disabled={isDisabled}
      className={classes}
      onClick={handleClick}
    >
      {content}
    </button>
  );
});

/* Default export */
const Button = forwardRef(function Button(props, ref) {
  return <ButtonBase {...props} ref={ref} isIconButton={false} />;
});

/* Named export */
export const IconButton = forwardRef(function IconButton(
  { children, "aria-label": ariaLabel, ...props },
  ref,
) {
  return (
    <ButtonBase {...props} ref={ref} isIconButton aria-label={ariaLabel}>
      {children}
    </ButtonBase>
  );
});

export default Button;
