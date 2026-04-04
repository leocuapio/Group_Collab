
import FoldersList from "@/components/new/folders";
import Link from "next/link";


export default function ProjectsPage() {
  return (
    <>
      <h1>Projects</h1>
      <Link
        href="/protected/project_form"
        className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        New Project
      </Link>
      <FoldersList />
    </>
  );
}