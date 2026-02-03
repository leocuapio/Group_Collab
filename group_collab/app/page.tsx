import { ThemeSwitcher } from "@/components/theme-switcher";
import Navbar from "@/components/new/navbar";
import Hero from "@/components/new/hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex flex-col items-center flex-1 gap-16 px-4 py-12 max-w-5xl mx-auto w-full">
        <Hero />

        {/* Optional next steps section */}
        {/* <div className="flex flex-col gap-6 w-full">
          <h2 className="text-xl font-medium mb-4">Next steps</h2>
          {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </div> */}
      </main>

      {/* Footer */}
      <footer className="w-full border-t mt-16 text-center text-xs py-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
        <ThemeSwitcher />
      </footer>
    </div>
  );
}
