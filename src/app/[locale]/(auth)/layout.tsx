import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function AuthLayout({ children, params }: Props) {
  const { locale } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect(`/${locale}`);
  }

  return (
    <main className="min-h-screen flex items-start justify-center bg-muted px-4 mt-16">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
