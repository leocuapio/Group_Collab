"use client"

import MemberSelect from "./memberSelect";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useUser } from "@/providers/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import { Task, Profile } from "@/lib/types"; 

interface ChildFormProps {
    projectId: string;  // include projectId
    setTask: React.Dispatch<React.SetStateAction<Task[]>>;
    members: Profile[];
    setMembers: React.Dispatch<React.SetStateAction<Profile[]>>;
  }
  
  export default function taskForm({ projectId, setTask, members, setMembers }: ChildFormProps) {
    
    const { user } = useUser();
    const [newTask, setNewTask] = useState({ title: "", description: "", project_id: projectId, created_by: user?.id || "" });
    const [selected, setSelected] = useState<string[]>([]);
    const [fullName, setfullNames] = useState<string[]>([]);
    const [taskId, settaskId] = useState("")
    const supabase = createBrowserSupabaseClient();
    async function fetchTasks() {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("project_id", projectId)
            .order("created_at", { ascending: true });
        if (error) {
            console.log(error);
            return;
        }
        setTask(data);
    }

    async function handleSubmit(e: any) {
        e.preventDefault();

        const {data: insertedTask, error } = await supabase.from("tasks").insert(newTask).select().single();
        // const assigneeRows = 

        // const { error: assignError } = await supabase.from("task_assignees").insert({task_id: insertedTask.id, user_id: user?.id, assigned_at: new Date().toISOString() }).single();
        // if (error) {
        //     console.error("Error adding task", error.message);
        // }

        if (selected.length > 0) {
          const assignedRows = selected.map((user_id) => ({task_id: insertedTask.id, user_id: user?.id, assigned_at: new Date().toISOString()}));

          const {error: assignError} = await supabase.from("task_assignees").insert(assignedRows);

          if (assignError) {
              console.log("Error assigning task", assignError.message);
          }
        };
        
        await fetchTasks();
        setNewTask({ title: "", description: "", project_id: projectId, created_by: user?.id || "" });
        setSelected([]);

    }

      async function fetchProjectMembers(projectId: string) {
        const { data: memberRows, error: memberError } = await supabase.from("project_members").select("user_id").eq("project_id", projectId)
    
        if (memberError) {
          console.error(memberError);
          return;
        }
    
        const userIds = memberRows?.map(row => row.user_id) ?? [];
    
        if (userIds.length === 0) {
          setMembers([]);
          return;
        }
    
        const { data: profiles, error: profileError } = await supabase.from("profiles").select("*").in("id", userIds)
        if (profileError) {
          console.error(profileError);
          return;
        }
    
        setMembers(profiles ?? []);
      }
    
      useEffect(() => {
        fetchTasks();
        fetchProjectMembers(projectId);
        
      }, [projectId]);
    
      useEffect(() => {
        const fulls = members.map((m) => m.full_name);
        setfullNames(fulls); // replace the state instead of appending repeatedly
      }, [members]);
    
      
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input
                type="text"
                id="title"
                name="title"
                onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
            />
            <br></br>
            <label htmlFor="title">Description: </label>
            <input
                type="text"
                id="description"
                name="description"
                onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, description: e.target.value }))
                }
            />
            <br></br>
            <MemberSelect
                user = {user}
                members={members}
                selected={selected}
                setSelected={setSelected}
            />
            <br></br>
            <button type="submit">Submit</button>
        </form>
    )
}