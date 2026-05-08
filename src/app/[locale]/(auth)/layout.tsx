type Props = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: Props) {
  return (
    <main className="min-h-screen flex items-start justify-center bg-muted px-4 mt-16">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
