"use client";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeadPassword, setRepeadPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeadPasswordError, setRepeadPasswordError] = useState("");

  const t = useTranslations("auth");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailError(t(""));
    setPasswordError("");
    setRepeadPasswordError(""); // todo : translate

    setEmailError("");
    if (!email.trim()) {
      setEmailError(t("errors.emptyEmail"));
      return;
    }
    if (!password.trim()) {
      setPasswordError(t("errors.emptyPassword"));
      return;
    }
    if (!repeadPassword.trim()) {
      setRepeadPasswordError(t("errors.emptyRepeatPassword"));
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
              <strong className="">{t("createAccountTitle")}</strong>
              <p className="text-pretty mt-1 tracking-tight">
                {t("createAccountDescription")}
              </p>
            </div>
            <Link href="/login">
              <h3 className="hover:border-b hover:border-amber-50 text-center">
                {t("login")}
              </h3>
            </Link>
          </div>
          <div className="mt-5">
            <Input
              label={t("email")}
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
            />
          </div>
          <div className="mt-2">
            <Input
              label={t("repeatPassword")}
              className="mt-1"
              placeholder={t("repeatPassword")}
              id="2"
              type="password"
              onChange={(e) => setRepeadPassword(e.target.value)}
              error={repeadPasswordError}
            />
          </div>
        </div>
        <div className="grid grid-flow-row">
          <Button variant="primary" className="mt-5 py-5" type="submit">
            {t("signUp")}
          </Button>
        </div>
      </div>
    </form>
  );
}
