import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id?: string | number;
  error?: string;
  className?: string;
  type?: "password" | "text" | "email" | "number";
  showForgetPassword?: boolean;
  forgetPasswordURL?: string;
};

export default function Input({
  label,
  id,
  type,
  className,
  error,
  showForgetPassword = false,
  forgetPasswordURL = "",
  ...props
}: Props) {
  const t = useTranslations("auth");
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium mx-1 flex justify-between"
        >
          {label}
          {showForgetPassword && (
            <Link
              href={forgetPasswordURL}
              className="font-medium tracking-tight"
            >
              {t("forgetPassword")}
            </Link>
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
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
