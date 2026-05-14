"use client";
import { useState } from "react";
import TaskForm from "./taskForm";
import type { Task, Profile } from "@/lib/types";

export default function Task({ projectId }: { projectId: string }) {
  const [task, setTask] = useState<Task[]>([]);
  const [members, setMembers] = useState<Profile[]>([]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <p className="text-sm font-medium text-slate-700">Project ID</p>
        <p className="mt-1 text-sm text-slate-600">{projectId}</p>
      </div>

      <TaskForm
        projectId={projectId}
        setTask={setTask}
        members={members}
        setMembers={setMembers}
      />

      <div className="rounded-2xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Project Members</h2>
        {members.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No members found</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {members.map((member) => (
              <li key={member.id}>
                {member.full_name} ({member.username})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Task List</h2>
        {task.length === 0 ? (
          <p className="text-sm text-slate-600">No tasks added yet.</p>
        ) : (
          task.map((task, key) => (
            <div key={key} className="rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">{task.title}</p>
              <p className="mt-2 text-sm text-slate-600">{task.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
