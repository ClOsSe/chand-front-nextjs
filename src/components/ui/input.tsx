import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id?: string | number;
  error?: string;
  className?: string;
  type?: "password" | "text" | "email" | "number";
  showForgetPassword?: boolean;
};

export default function Input({
  label,
  id,
  type,
  className,
  error,
  showForgetPassword,
  ...props
}: Props) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium mx-1 flex justify-between"
        >
          {label}
          {!showForgetPassword && (
            <span className="font-medium tracking-tight">
              Forget Your Password?
            </span>
          )}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={[
          "w-full rounded-lg border border-slate-300 bg-gray-300 px-3 py-2 text-sm outline-none text-slate-700",
          "focus:border-slate-500 focus:ring-2 focus:ring-slate-200",
          error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "",
          className,
        ].join(" ")}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}test</p>}
    </div>
  );
}
