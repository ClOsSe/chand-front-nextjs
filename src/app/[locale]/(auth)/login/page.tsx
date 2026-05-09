"use client";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const t = useTranslations("auth");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setEmailError("");
    setPassword("");

    if (!email.trim()) {
      setEmailError(t("errors.emptyEmail"));

      return;
    }
    if (!password.trim()) {
      setPasswordError(t("errors.emptyPassword"));
      return;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mx-auto w-96 bg-(--cardBackground) text-(--cardForeground) border-nonw shadow-2xl/30 p-4 rounded-2xl justify-center"
    >
      <div className="grid grid-flow-row auto-rows-max w-100 content-between ">
        <div>
          <div className="grid grid-cols-5 gap-1 ">
            <div className="col-span-4 ">
              <strong className="">{t("loginTitle")}</strong>
              <p className="text-pretty mt-1 tracking-tight">
                {t("loginDescription")}
              </p>
            </div>
            <Link href="/register">
              <h3 className="hover:border-b hover:border-amber-50 text-center">
                {t("signUp")}
              </h3>
            </Link>
          </div>
          <div className="mt-5">
            <Input
              label={t("loginTitle")}
              className="mt-1"
              placeholder={t("exampleEmail")}
              id="1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />
          </div>
          <div className="mt-2">
            <Input
              label={t("password")}
              className="mt-1"
              placeholder={t("password")}
              id="2"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              showForgetPassword
              forgetPasswordURL="/forget"
            />
          </div>
        </div>
        <div className="grid grid-flow-row">
          <Button variant="primary" className="mt-5 py-5" type="submit">
            {t("login")}
          </Button>
          <Button variant="secondary" className="mt-2 py-4" disabled>
            {t("loginWithGoogle")}
          </Button>
        </div>
      </div>
    </form>
  );
}
