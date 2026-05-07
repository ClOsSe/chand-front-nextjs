type Props = {
  params: Promise<{
    locale: string;
  }>;
};
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-(--background) text-(--foreground)">
      <h1>Chand ({locale})</h1>
    </main>
  );
}
