"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Dashboard", slug: "" },
  { label: "Tasks", slug: "tasks" },
  { label: "Goals", slug: "goals" },
  { label: "Files", slug: "files" },
  { label: "Chat", slug: "chat" },
];

export default function ProjectTabs({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const basePath = `/protected/specific_projects/${projectId}`;

  return (
    <nav className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
      {tabs.map((tab) => {
        const href = tab.slug ? `${basePath}/${tab.slug}` : basePath;
        const isActive = pathname === href;

        return (
          <Link
            key={tab.label}
            href={href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
