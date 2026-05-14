"use client"

import MemberSelect from "./memberSelect";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useUser } from "@/providers/AuthProvider";
import { FormEvent, useEffect, useState } from "react";
import { Task, Profile } from "@/lib/types"; 

interface ChildFormProps {
    projectId: string;  // include projectId
    setTask: React.Dispatch<React.SetStateAction<Task[]>>;
    members: Profile[];
    setMembers: React.Dispatch<React.SetStateAction<Profile[]>>;
  }
  
export default function TaskForm({ projectId, setTask, members, setMembers }: ChildFormProps) {
    
    const { user } = useUser();
    const [newTask, setNewTask] = useState({ title: "", description: "", project_id: projectId, created_by: user?.id || "" });
    const [selected, setSelected] = useState<string[]>([]);
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

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const {data: insertedTask, error } = await supabase.from("tasks").insert(newTask).select().single();

        if (error || !insertedTask) {
            console.error("Error adding task", error);
            return;
        }

        if (selected.length > 0) {
          const assignedRows = selected.map((selectedUserId) => ({
            task_id: insertedTask.id,
            user_id: selectedUserId,
            assigned_at: new Date().toISOString(),
          }));

          const {error: assignError} = await supabase.from("task_assignees").insert(assignedRows);

          if (assignError) {
              console.log("Error assigning task", assignError.message);
          }
        };
        
        await fetchTasks();
        setNewTask({ title: "", description: "", project_id: projectId, created_by: user?.id || "" });
        setSelected([]);

    }

      useEffect(() => {
        async function loadProjectData() {
          const { data: taskRows, error: taskError } = await supabase
            .from("tasks")
            .select("*")
            .eq("project_id", projectId)
            .order("created_at", { ascending: true });

          if (taskError) {
            console.error(taskError);
          } else {
            setTask(taskRows);
          }

          const { data: memberRows, error: memberError } = await supabase
            .from("project_members")
            .select("user_id")
            .eq("project_id", projectId);

          if (memberError) {
            console.error(memberError);
            return;
          }

          const userIds = memberRows?.map((row) => row.user_id) ?? [];

          if (userIds.length === 0) {
            setMembers([]);
            return;
          }

          const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .in("id", userIds);

          if (profileError) {
            console.error(profileError);
            return;
          }

          setMembers(profiles ?? []);
        }

        loadProjectData();
      }, [projectId, setMembers, setTask, supabase]);
    
    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Add a task</h2>
            <div className="mt-4 grid gap-4">
                <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium text-slate-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                        onChange={(e) =>
                            setNewTask((prev) => ({ ...prev, title: e.target.value }))
                        }
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="description" className="text-sm font-medium text-slate-700">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                        onChange={(e) =>
                            setNewTask((prev) => ({ ...prev, description: e.target.value }))
                        }
                    />
                </div>
                <MemberSelect
                    user = {user}
                    members={members}
                    selected={selected}
                    setSelected={setSelected}
                />
                <button
                    type="submit"
                    className="w-fit rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
