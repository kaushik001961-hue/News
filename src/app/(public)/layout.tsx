export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="border-b">
        <div className="container mx-auto py-4">
          <h1 className="text-3xl font-bold">
            UJAHS NEWS
          </h1>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t mt-10 py-10 text-center">
        © 2026 UJAHS NEWS
      </footer>
    </div>
  );
}