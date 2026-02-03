type Folder = {
    name: string;
    notes: number;
    size: string;
    active?: boolean;
  };
  
  const folders: Folder[] = [
    { name: "UX research", notes: 233, size: "116.9 MB" },
    { name: "Raw data", notes: 39, size: "180.2 MB", active: true },
    { name: "Processed data", notes: 21, size: "23.4 MB" },
    { name: "Reports", notes: 17, size: "490 MB" },
    { name: "Data visualization", notes: 96, size: "1.3 GB" },
    { name: "Ideas and Insights", notes: 103, size: "126.3 MB" },
  ];
  
  export default function FoldersGrid() {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {folders.map((folder) => (
          <div
            key={folder.name}
            className={`relative h-44 rounded-3xl p-6 transition ${
              folder.active
                ? "bg-gradient-to-b from-blue-300 to-blue-500 text-white shadow-xl"
                : "bg-white shadow-md"
            }`}
          >
            {/* Folder tab */}
            <div
              className={`absolute left-6 top-[-10px] h-6 w-20 rounded-t-xl ${
                folder.active ? "bg-blue-200" : "bg-gray-200"
              }`}
            />
  
            <h2 className="text-lg font-semibold">{folder.name}</h2>
  
            <p
              className={`mt-1 text-sm ${
                folder.active ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {folder.notes} notes
            </p>
  
            <p
              className={`absolute bottom-6 text-sm ${
                folder.active ? "text-blue-100" : "text-gray-400"
              }`}
            >
              {folder.size}
            </p>
          </div>
        ))}
      </div>
    );
  }
  