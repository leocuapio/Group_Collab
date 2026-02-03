import FoldersGrid from "@/components/new/folders";

export default function Projects() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] p-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Group Collaboration Platform</h1>

        <button className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          New Project
        </button>
      </div>

      {/* Search + Filter */}
      <div className="mb-8 flex gap-4">
        <input
          placeholder="Search"
          className="w-72 rounded-full border bg-white px-4 py-2 text-sm shadow-sm focus:outline-none"
        />
        <button className="rounded-full border bg-white px-4 py-2 text-sm shadow-sm">
          Filter
        </button>
      </div>

      {/* Folders */}
      <FoldersGrid />
    </main>
  );
}
