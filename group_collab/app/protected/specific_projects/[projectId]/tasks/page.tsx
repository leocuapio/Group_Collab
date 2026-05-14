import ProjectSection from "@/components/new/project-section";
import Task from "@/components/new/task";

export default async function SpecificProjectTasksPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <ProjectSection
      title="Tasks"
      description="Manage project tasks here while keeping the same layout as the dashboard and goals pages."
    >
      <Task projectId={projectId} />
    </ProjectSection>
  );
}
