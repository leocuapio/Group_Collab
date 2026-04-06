import { User } from "@supabase/supabase-js";
export interface Task {
    title: string;
    description: string;
    task_designation: string;
  }
  
  export interface Profile {
    id: string;
    username: string;
    full_name: string;
    user: User;
  }