import { Suspense } from "react";
import { AuthButton } from "../auth-button";
import { NavbarClient } from "./navbar_client";
import { EnvVarWarning } from "../env-var-warning";
import { hasEnvVars } from "@/lib/utils";

export function Navbar() {
  return (
    <NavbarClient
      authSlot={
        !hasEnvVars ? (
          <EnvVarWarning />
        ) : (
          <Suspense>
            <AuthButton />
          </Suspense>
        )
      }
    />
  );
}

export default Navbar;
