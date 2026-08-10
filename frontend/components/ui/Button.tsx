import { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  return (
    <button
      className={`btn px-4 py-2.5 text-sm font-semibold ${variant === "primary" ? "btn-primary" : variant === "danger" ? "btn-danger" : "btn-secondary"} ${className}`}
      {...props}
    />
  );
}
