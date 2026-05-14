import { ReactNode } from "react";

type ProjectSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function ProjectSection({
  title,
  description,
  children,
}: ProjectSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>

      {children}
    </section>
  );
}
