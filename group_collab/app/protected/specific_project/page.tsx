"use client"
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Task from "@/components/new/task";



export default function specificProject () {
    const searchParams = useSearchParams();
    const project = searchParams.get("project")
    const supabase = createClient();

    const [projectData, setprojectData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);
    useEffect(() => {
        if (!project) return;

        setprojectData(null);
        setLoading(true);

        const getProjectById = async () => { 
            const {data, error} = await supabase.from("projects").select("*").eq("id", project).maybeSingle();
            if (error) {
                console.error("Error fetching project:", error)
                setLoading(false);
                return;
            }
    
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
            <Task projectId={projectData.id || ""} />

        </>
    )
}