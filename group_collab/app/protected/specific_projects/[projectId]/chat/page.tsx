"use client"

import { use, useEffect } from "react";
import ProjectSection from "@/components/new/project-section";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { FormEvent, useState } from "react";
import { useUser } from "@/providers/AuthProvider";

export default function SpecificProjectChatPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const {user} = useUser();
  const supabase = createBrowserSupabaseClient();
  const [messagedata, setMessagedata] = useState({content: ""})
  const [messages, setMessages] = useState<any>([]);

    async function handleSubmit (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const { data, error } = await supabase.from("messages").insert({project_id: projectId, sender_id: user?.id, content: messagedata.content}).select().single();
      if (error) {
        console.error("Error adding message to DB", error)
      }
      await fetchMessages();
      setMessagedata({content: ""})
    }

    async function fetchMessages(){
      const {data, error} = await supabase.from("messages").select("*").eq("project_id", projectId).order("created_at", { ascending: true });
      if (error) {
        console.log(error);
        return;
      }
      setMessages(data)
    }

    useEffect(() => {
      fetchMessages();

      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `project_id=eq.${projectId}`,
          },
          (payload) => console.log(payload.new)
        )
        .subscribe()

        return () => {
          supabase.removeChannel(channel);
        }
        
    }, [projectId]);

    return (
        <ProjectSection
      title="Team Chat"
      description=""
    >
     <div>
        <form onSubmit={handleSubmit}>
          <input name = "message" value = {messagedata.content} onChange= {(e) => setMessagedata((prev) => ({...prev, content: e.target.value}))} type="text" id="" placeholder="Insert message here"/>
          <button type="submit">Submit</button>
        </form>

        {messages.length === 0 ? (
          <p>There are no messages</p>
        ) : (
          messages.map((message: any) => (
            <div key={message.id}>
              <p>{message.sender_id} says</p>
              <p>{message.content}</p>
            </div>
          ))
        )}
     </div>
    </ProjectSection>
    );
}