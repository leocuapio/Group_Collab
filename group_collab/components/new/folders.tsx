import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function FoldersList() {

  const supabase = await createServerSupabaseClient();

  const {
    data:{user}
  } = await supabase.auth.getUser();

  if(!user){
    return <p>Not logged in</p>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();
  

  const { data: projects,error } =
    await supabase
    .from("projects")
    .select(`
      *,
      project_members!inner(user_id)
    `)
    .eq("project_members.user_id",user.id);
  
  console.log("hi", projects)

  if(error){
    console.error(error);
    return <p>Error loading projects</p>;
  }

  if(!projects){
    return <p>No projects</p>;
  }

  return(

    <div>

      <h1>Folders List</h1>

      <p>User Name: {profile?.username}</p>

      {projects.map((p)=>(
        <div key={p.id}>
          <Link href={`/protected/specific_projects/${p.id}`}>
            {p.name}
          </Link>
        </div>
      ))}

    </div>

  );

}
