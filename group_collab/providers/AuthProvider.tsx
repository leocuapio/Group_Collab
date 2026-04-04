"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type AuthContextType = {
  user: User | null;
  session: Session | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
});

export function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {

  const [session,setSession] = useState(initialSession);
  const [user,setUser] = useState(initialSession?.user ?? null);

  useEffect(()=>{

    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (_event,session)=>{
          setSession(session);
          setUser(session?.user ?? null);
        }
      );

    return ()=>listener.subscription.unsubscribe();

  },[]);

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = ()=>useContext(AuthContext);