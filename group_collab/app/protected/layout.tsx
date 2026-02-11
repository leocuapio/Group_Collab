import ProtectedNav from "@/components/new/protected_nav";
import ProtectedFooter from "@/components/new/protected_footer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <ProtectedNav />
      
      <section className="flex-1">
        {children}
      </section>

      <ProtectedFooter />
    </main>
  );
}
