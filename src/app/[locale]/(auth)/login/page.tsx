"use client";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { loginMutationOptions } from "@/services/auth/auth.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import z from "zod";

const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .min(1, t("errors.requiredEmail"))
      .email(t("errors.invalidEmail")),

    password: z.string().min(8, t("errors.invalidPassword")),
  });
};

type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const loginMutation = useMutation({
    ...loginMutationOptions,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("[login]", error);
    },
  });
  const loginSchema = createLoginSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          <div className="mt-2">
            <Input
              label={t("password")}
              className="mt-1"
              placeholder={t("password")}
              id="2"
              type="password"
              showForgetPassword
              {...register("password")}
              error={errors.password?.message}
              forgetPasswordURL="/forget"
            />
          </div>
        </div>
        <div className="grid grid-flow-row">
          <Button variant="primary" className="mt-5 py-5" type="submit">
            {isSubmitting ? t("sending") : t("login")}
          </Button>
          <Button variant="secondary" className="mt-2 py-4" disabled>
            {t("loginWithGoogle")}
          </Button>
        </div>
      </div>
    </form>
  );
}
