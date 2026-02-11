import Link from "next/link";
import { Suspense } from "react";

import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/lib/utils";
import RandomButton from "@/components/new/ranbutton";

export default function ProtectedNav() {
  return (
    <nav className="w-full border-b border-b-foreground/10 h-16">
      <div className="mx-auto max-w-5xl h-full flex items-center justify-between px-5 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Link href="/protected/projects">
            Next.js Supabase Starter
          </Link>
          <RandomButton />
        </div>

        {!hasEnvVars ? (
          <EnvVarWarning />
        ) : (
          <Suspense>
            <AuthButton />
          </Suspense>
        )}
      </div>
    </nav>
  );
}
