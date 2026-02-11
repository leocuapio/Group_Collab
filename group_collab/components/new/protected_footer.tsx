import { ThemeSwitcher } from "@/components/theme-switcher";

export default function ProtectedFooter() {
  return (
    <footer className="w-full border-t text-xs py-10 flex justify-center">
      <div className="flex gap-8 items-center">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:underline"
          >
            Supabase
          </a>
        </p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
