import Link from "next/link";
import { ReactNode, Suspense } from "react";

import ProjectTabs from "@/components/new/project-tabs";
import { getProjectForCurrentUser } from "@/lib/projects";

async function SpecificProjectLayoutContent({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProjectForCurrentUser(projectId);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-3xl bg-slate-950 p-8 text-white shadow-lg">
        <Link
          href="/protected/projects"
          className="text-sm font-medium text-slate-200 hover:text-white"
        >
          Back to projects
        </Link>

        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
            Project:
          </p>
          <h1 className="text-3xl font-semibold">{project.name}</h1>
          <p className="max-w-3xl text-sm text-slate-300">
            {project.description || "Add a short description so the team can understand this project quickly."}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <ProjectTabs projectId={projectId} />
        {children}
      </div>
    </div>
  );
}

export default async function SpecificProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  return (
    <Suspense fallback={<div className="px-4 py-8 sm:px-6 lg:px-8">Loading project...</div>}>
      <SpecificProjectLayoutContent params={params}>
        {children}
      </SpecificProjectLayoutContent>
    </Suspense>
  );
}
