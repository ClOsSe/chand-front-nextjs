import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function MainLayout({ children, params }: Props) {
  const { locale } = await params;

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  // if (!token) {
  //   redirect(`/${locale}/login`);
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
