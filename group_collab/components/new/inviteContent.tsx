"use client";

import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function InviteContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState("loading");

  // 1. Get user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // 2. Handle invite logic
  useEffect(() => {
    if (!user || !token) return;

    const acceptInvite = async () => {
      // Get invite
      const { data: invite, error: inviteError } = await supabase
        .from("invites")
        .select("*")
        .eq("token", token)
        .single();

      if (inviteError || !invite) {
        setStatus("invalid");
        return;
      };

      if (invite.status === "accepted") {
        setStatus("already_used");
        return;
      };

      if (new Date() > invite.expires_at ) {
        setStatus("Invite Expired")
        return;
      };

      // Insert member
      const { error } = await supabase.from("project_members").insert([
        {
          user_id: user.id,
          project_id: invite.project_id,
          role: invite.role ?? "member",
        },
      ]);

      if (error) {
        console.error(error);
        setStatus("error");
        return;
      }

      // Mark invite accepted
      await supabase
        .from("invites")
        .update({ status: "accepted" })
        .eq("token", token);

      setStatus("success");
    };

    acceptInvite();
  }, [user, token]);

  // UI states
  if (status === "loading") return <div>Accepting invite...</div>;
  if (status === "invalid") return <div>Invalid invite</div>;
  if (status === "already_used") return <div>Invite already used</div>;
  if (status === "error") return <div>Something went wrong</div>;

  return <div>✅ Invite accepted!</div>;
}