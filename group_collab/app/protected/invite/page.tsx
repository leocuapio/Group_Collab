"use client";

import { Suspense } from "react";
import InviteContent from "@/components/new/inviteContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading invite...</div>}>
      <InviteContent />
    </Suspense>
  );
}