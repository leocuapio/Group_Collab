"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Task {
  title: string;
  description: string;
}

export default function Task( { projectId }: { projectId: string } ) {
  const supabase = createClient();
  const [task, setTask] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", project_id: projectId });
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

    const { error } = await supabase.from("tasks").insert(newTask).single();
    if (error) {
      console.error("Error adding task", error.message);
    }

    await fetchTasks();
    setNewTask({ title: "", description: "", project_id: projectId });
  }

  useEffect(() => {  
    fetchTasks();
  }, [projectId]);

  return (
    <>
      <div>
        <h1>Hello this is the Tasks</h1>
      </div>
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
        <button type="submit">Submit</button>
      </form>

      {task.map((task, key) => (
        <div key={key}>
          <p>Task {task.title}</p>
          <br></br>
          <p>{task.description}</p>
        </div>
      ))}
    </>
  );
}
