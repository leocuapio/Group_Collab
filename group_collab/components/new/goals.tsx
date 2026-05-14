interface GoalsProps {
  projectId: string;
}

export default function Goals({ projectId }: GoalsProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <p className="text-sm font-medium text-slate-700">Project ID</p>
        <p className="mt-1 text-sm text-slate-600">{projectId}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Goal planning area
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          This page now shares the same structure as your dashboard and tasks
          pages. You can add goal cards, milestones, or a form here next.
        </p>
      </div>
    </div>
  );
}
