import { notFound, redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ProjectRecord = {
  id: string;
  name: string;
  description: string | null;
  project_type: string | null;
  created_at: string;
};

export async function getProjectForCurrentUser(projectId: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      name,
      description,
      project_type,
      created_at,
      project_members!inner(user_id)
    `)
    .eq("id", projectId)
    .eq("project_members.user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error loading project", error);
    notFound();
  }

  if (!data) {
    notFound();
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    project_type: data.project_type,
    created_at: data.created_at,
  } satisfies ProjectRecord;
}
