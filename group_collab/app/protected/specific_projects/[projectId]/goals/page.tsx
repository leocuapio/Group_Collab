import Goals from "@/components/new/goals";
import ProjectSection from "@/components/new/project-section";

export default async function SpecificProjectGoalsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <ProjectSection
      title="Goals"
      description="Track the project goals here with the same shared project header and tab navigation."
    >
      <Goals projectId={projectId} />
    </ProjectSection>
  );
}
