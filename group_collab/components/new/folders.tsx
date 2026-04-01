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
    const [userName, setUserName] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<any>(true);


  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      setProjects([]);
      setLoading(true);

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) setUserName(profile.username);

      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          project_members!inner(user_id)
        `)
        .eq("project_members.user_id", user.id);
              

      if (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
        return;
      }

      setProjects(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <p>Loading projects...</p>
  if (!projects) return <p>Projects not found</p>
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