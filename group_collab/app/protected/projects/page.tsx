"use client"
import FoldersList from "@/components/new/folders";
import { useRouter } from "next/navigation";

export default function Projects() {
  const router = useRouter();
  return (
    <>
    <h1>Projects</h1>
    <button onClick= {() => router.push("/protected/project_form")}className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90">New Project</button>
    <FoldersList />
    </>
  );
}
