"use client";
import {useState } from "react";
import { useUser } from "@/providers/AuthProvider";
import MemberSelect from "./memberSelect";
import TaskForm from "./taskForm";
import type { Task, Profile } from "@/lib/types"; 

export default function Task({ projectId }: { projectId: string }) {
  const [task, setTask] = useState<Task[]>([]);
  const [members, setMembers] = useState<Profile[]>([]);

  return (
    <>
    
      <div>
        <h1><b>Hello this is the Tasks</b></h1>
        <p>Project ID: {projectId}</p>
      </div>

      <TaskForm
        projectId={projectId}
        setTask={setTask}
        members={members}
        setMembers={setMembers}
      />

      <div>
        <h2>Project Members</h2>
        {members.length === 0 ? (
          <p>No members found</p>
        ) : (
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                {member.full_name} ({member.username})
              </li>
            ))}
          </ul>
        )}
      </div>

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
