"use client"

import { use, useEffect, useRef, useState } from "react";
import ProjectSection from "@/components/new/project-section";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useUser } from "@/providers/AuthProvider";
import Link from "next/link";

type projectType = {
    name: string,
    updated_at?: string,
    created_at?: string,
    last_accessed_at?: string,
    id: string,
}

export default function SpecificProjectFilePage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { projectId } = use(params);
    const { user } = useUser();
    const supabase = createBrowserSupabaseClient();
    // Stores files in state 
    const [files, setFiles] = useState<File[]>([]);
    const [allfiles, setAllfiles] = useState<projectType[]>([]);
    const [publicurls, setPublicurls] = useState<string[]>([])

    function handleClick() {
        fileInputRef.current?.click();
    };

   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // const file = event.target.files?.[0]
        // if (file) {
        //     console.log("Selected file: ", file)
        // }
        const selectedfiles = event.target.files
        if (!selectedfiles) {
            return
        }
        const fileArray = Array.from(selectedfiles);
        setFiles(fileArray)
    }; 

    async function handleSubmit() {
        for (let i = 0; i < files.length; i++) {
            const {error} = await supabase.storage.from("files").upload(`${projectId}/${files[i]?.name}`, files[i]);
            if (error) {
                console.error("Error submitting files to DB", error)
                return;
            }
        
        console.log("Sucessfully uploaded file(s) to DB")
        }
    }
    

    useEffect(() => {
        async function fetchFiles () {
            console.log("This is the projectID",projectId);
            const {data, error} = await supabase.storage.from("files").list(`${projectId}`, {
                limit: 100, // Number of files to return
                offset: 0,  // Pagination offset
                sortBy: { column: 'created_at', order: 'asc' }
              })

              const urls = (data ?? []).map(f => {
                const {data: urlData} = supabase.storage
                  .from("files")
                  .getPublicUrl(`${projectId}/${f.name}`)
                return urlData.publicUrl;
                });

            setAllfiles(data ?? [])
            setPublicurls(urls)
            console.log("This is all the files!! hi", data)
            console.log("Hello this is data's type: ", typeof data);
        }
        fetchFiles();
        
    }, [projectId])
    return (
        <ProjectSection
            title="File Sharing"
            description=""
        >
            <button onClick={handleClick}>Add File</button>
            <input type="file" onChange={handleChange} ref={fileInputRef} multiple/>
            <button onClick={handleSubmit}>Submit</button>
            <ul>
            {allfiles.map(file => (
                <li key = {file.id}>
                    <p>{file.name}</p>
                </li>
            ))}
            </ul>
            <ul>
            {publicurls.map((u, i) => (
                <li key = {i} >
                    <a href={u}>{u}</a>
                </li>
            ))}
            </ul>
        </ProjectSection>
    );
}