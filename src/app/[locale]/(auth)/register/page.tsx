"use client";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { registerMutationOptions } from "@/services/auth/auth.queries";

import { useForm } from "react-hook-form";
import z from "zod";

const createRegisterFormSchema = (t: (key: string) => string) => {
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
      message: t("errors.passwordsNotMatch"),
      path: ["confirmPassword"],
    });
};

type RegisterAccountValues = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>;

export default function RegisterPage() {
  const t = useTranslations("auth");

  const router = useRouter();
  const registerMutation = useMutation({
    ...registerMutationOptions,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("[register]", error);
    },
  });

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
    registerMutation.mutate(values);
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
          {registerMutation.isError && (
            <p className="mt-3 text-sm text-red-500">
              {registerMutation.error.message}
            </p>
          )}
        </div>
        <div className="grid grid-flow-row">
          <Button
            variant="primary"
            className="mt-5 py-5"
            type="submit"
            disabled={isSubmitting || registerMutation.isPending}
          >
            {registerMutation.isPending ? t("sending") : t("signUp")}
          </Button>
        </div>
      </div>
    </form>
  );
}
