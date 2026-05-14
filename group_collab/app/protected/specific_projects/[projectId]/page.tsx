import Link from "next/link";

import ProjectSection from "@/components/new/project-section";
import { getProjectForCurrentUser } from "@/lib/projects";

export default async function SpecificProjectDashboardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProjectForCurrentUser(projectId);

  const summaryCards = [
    {
      label: "Project Type",
      value: project.project_type || "Not set",
    },
    {
      label: "Created",
      value: new Date(project.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    },
    {
      label: "Project ID",
      value: project.id,
    },
  ];

  // TODO: Add project members to the summary cards
  // const summaryCards2 = [
  //   {
  //     label: "Project Members",
  //     value: project.project_members?.length || 0,
  //   },
  // ];

  return (
    <ProjectSection
      title="Dashboard"
      description="Use this page as the project overview, then jump into tasks or goals from the same shared layout."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 break-words text-base font-medium text-slate-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>
{/* 
      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 break-words text-base font-medium text-slate-900">
              {card.value}
            </p>
          </div>
        ))}
      </div> */}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/protected/specific_projects/${projectId}/tasks`}
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Open Tasks
        </Link>
        <Link
          href={`/protected/specific_projects/${projectId}/goals`}
          className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          Open Goals
        </Link>
      </div>
    </ProjectSection>
  );
}
