"use client";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import z from "zod";

export const createRegisterFormSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: z
        .string()
        .min(1, t("errors.requiredEmail"))
        .email(t("errors.invalidEmail")),

      password: z.string().min(1, t("errors.passwordMinLength")),
      confirmPassword: z.string().min(1, t("errors.requiredConfirmPassword")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("error.passwordsNotMatch"),
      path: ["confirmPassword"],
    });
};

type RegisterAccountValues = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>;

export default function RegisterPage() {
  const t = useTranslations("auth");
  const registerAccountSchema = createRegisterFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterAccountValues>({
    resolver: zodResolver(registerAccountSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterAccountValues) {
    console.log(values);
    // todo: call api
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
              {...register("password")}
              error={errors.password?.message}
            />
          </div>
          <div className="mt-2">
            <Input
              label={t("repeatPassword")}
              className="mt-1"
              placeholder={t("repeatPassword")}
              id="2"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
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
