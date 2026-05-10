import { ReactNode } from "react";

import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function MainLayout({ children, params }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
