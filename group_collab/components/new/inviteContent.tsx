"use client";

import { useSearchParams } from "next/navigation";

export default function InviteContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <div>Accepting invite: {token}</div>;
}