"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Profile } from "@/lib/types";


export function AuthButton() {
  const supabase = createBrowserSupabaseClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
  
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .maybeSingle();
        setProfile({
          id: user?.id,
          username: data?.username || user?.user_metadata?.name,
          full_name: user?.user_metadata?.name,
          user: user
        });
      }
  
      setLoading(false);
    };
  
    fetchUser();
  }, []);
 if (loading) return <p>Loading...</p>;
 if (!user) return <p>Not logged in</p>;
 if (!profile) return <p>No profile found</p>;
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {profile?.username}!
      {/* Profile icon to link to the profile page */}
      <Link
        href="/protected/profile"
        className="rounded-full p-1 hover:bg-accent transition"
        aria-label="Profile"
      >
        <UserCircleIcon className="h-7 w-7 text-foreground" />
      </Link>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
