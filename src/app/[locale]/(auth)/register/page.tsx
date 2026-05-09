"use client";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import { Link } from "@/i18n/navigation";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeadPassword, setRepeadPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeadPasswordError, setRepeadPasswordError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordError("");
    setRepeadPasswordError(""); // todo : translate

    setEmailError("");
    if (!email.trim()) {
      setEmailError("Email is empty"); // todo : translate
      return;
    }
    if (!password.trim()) {
      setPasswordError("Password is empty"); // todo : translate
      return;
    }
    if (!repeadPassword.trim()) {
      setRepeadPasswordError("Retype Your Password"); // todo : translate
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
              <strong className="">Create Account</strong>
              <p className="text-pretty mt-1 tracking-tight">
                Enter your email below and choose an strong password
              </p>
            </div>
            <Link href="/login">
              <h3 className="hover:border-b hover:border-amber-50 text-center">
                login
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
          <div className="mt-2">
            <Input
              label="Password"
              className="mt-1"
              placeholder="password"
              id="2"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
            />
          </div>
          <div className="mt-2">
            <Input
              label="Repeat Password"
              className="mt-1"
              placeholder="password"
              id="2"
              type="password"
              onChange={(e) => setRepeadPassword(e.target.value)}
              error={repeadPasswordError}
            />
          </div>
        </div>
        <div className="grid grid-flow-row">
          <Button variant="primary" className="mt-5 py-5" type="submit">
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
}
