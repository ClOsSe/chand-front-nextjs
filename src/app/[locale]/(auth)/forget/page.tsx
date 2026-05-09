"use client";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import { Link } from "@/i18n/navigation";

import { useState } from "react";

export default function ForgetPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is empty"); // todo : translate
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
              <strong className="">Recover Your Password</strong>
              <p className="text-pretty mt-1 tracking-tight">
                Enter your email below to send recovery email
              </p>
            </div>
            <Link href="/login">
              <h3 className="hover:border-b hover:border-amber-50 text-center">
                Login
              </h3>
            </Link>
          </div>
          <div className="mt-5">
            <Input
              label="Email"
              className="mt-1"
              placeholder="example@email.com"
              id="1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />
          </div>
        </div>
        <div className="grid grid-flow-row">
          <Button variant="primary" className="mt-5 py-5" type="submit">
            Send
          </Button>
        </div>
      </div>
    </form>
  );
}
