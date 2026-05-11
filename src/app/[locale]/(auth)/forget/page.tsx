"use client";
import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { forgotPasswordMutationOptions } from "@/services/auth/auth.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import { useForm } from "react-hook-form";
import z from "zod";

const createForgetPasswordSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .min(1, t("errors.requiredEmail"))
      .email(t("errors.invalidEmail")),
  });
};
type ForgetPasswordFormValues = z.infer<
  ReturnType<typeof createForgetPasswordSchema>
>;
export default function ForgetPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const forgetPassMutation = useMutation({
    ...forgotPasswordMutationOptions,
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("[register]", error);
    },
  });
  const forgetPasswordSchema = createForgetPasswordSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: ForgetPasswordFormValues) {
    forgetPassMutation.mutate(values);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex mx-auto w-full sm:w-96 bg-(--cardBackground) text-(--cardForeground) border-nonw shadow-2xl/30 p-4 rounded-2xl justify-center"
    >
      <div className="grid grid-flow-row auto-rows-max w-100 content-between ">
        <div>
          <div className="grid grid-cols-5 gap-1 ">
            <div className="col-span-4 ">
              <strong className="">{t("recoverYourPasswordTitle")}</strong>
              <p className="text-pretty mt-1 tracking-tight">
                {t("recoverYourPasswordDescription")}
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
              placeholder={t("email")}
              id="1"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
        </div>
        <div className="grid grid-flow-row">
          <Button variant="primary" className="mt-5 py-5" type="submit">
            {}
            {isSubmitting ? t("sending") : t("send")}
          </Button>
        </div>
      </div>
    </form>
  );
}
