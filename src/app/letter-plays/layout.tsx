export default function LetterPlaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto py-4 md:px-0 px-4">
      {children}
    </section>
  );
}
