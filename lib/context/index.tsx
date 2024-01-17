"use client"

import { createContext } from "react";
import { Session } from "@supabase/supabase-js";
 
export const UserSessionContext = createContext<{
  session: Session | undefined;
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
}>({
  session: undefined,
  setSession: (_) => _,
});
 
