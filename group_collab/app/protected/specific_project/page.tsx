"use client"
import { useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useEffect, useState, Suspense } from "react";
import Task from "@/components/new/task";
import { useUser } from "@/providers/AuthProvider";

function SpecificProject() {
    const searchParams = useSearchParams();
    const project = searchParams.get("project")
    const supabase = createBrowserSupabaseClient();

    const [projectData, setprojectData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);

    const { user } = useUser(); // kept (not removed)
    const [secureUser, setSecureUser] = useState<any>(null); // ✅ added

    // ✅ secure user fetch
    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.error("Error fetching user:", error);
                return;
            }

            setSecureUser(data.user);
        };

        getUser();
    }, []);

    useEffect(() => {
        if (!project) return;

        setprojectData(null);
        setLoading(true);

        const getProjectById = async () => { 
            const {data, error} = await supabase
                .from("projects")
                .select("*")
                .eq("id", project)
                .maybeSingle();

            if (error) {
                console.error("Error fetching project:", error)
                setLoading(false);
                return;
            }

            console.log("hello", data)

            setprojectData(data);
            setLoading(false);
        }

        getProjectById();
    }, [project]);

    if (loading) return <p>Loading project...</p>
    if (!projectData) return <p>Project not found</p>

    return (
        <>
            <h1>Hello World</h1>
            <p>{project}</p>
            <p>{projectData.name}</p>
            <p>{projectData.description}</p>
            <p>{projectData.project_type}</p>

            {/* you can use secureUser if needed */}
            {/* console.log(secureUser) */}

            <Task projectId={projectData.id || ""}/>
        </>
    )
}

// ✅ Suspense wrapper (fixes Next.js error)
export default function Wrapper() {
    return (
        <Suspense fallback={<p>Loading project...</p>}>
            <SpecificProject />
        </Suspense>
    );
}