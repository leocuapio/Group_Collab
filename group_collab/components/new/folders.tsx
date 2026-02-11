import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
}
  

export default function FoldersList() {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);


  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) setUserName(profile.username);

      const { data: projects } = await supabase
        .from("projects")
        .select("*");

      setProjects(projects ?? []);
    };

    load();
  }, []);


    return (
        <div>
            <h1>Folders List</h1>
            <p>User Name: {userName}</p>
            {projects.map((p) => (
            <div key={p.id}>
              <Link href={`/protected/specific_project?project=${encodeURIComponent(p.id)}`}>{p.name}</Link>
            </div>
             ))}

        </div>
    );
}