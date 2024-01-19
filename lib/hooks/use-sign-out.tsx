"use client"

import { useCallback } from "react";
import useSupabase from "@/lib/supabase/use-supabase";
import { reloadWindow } from "@/lib//hack";
 
export function useSignOut() {
  const client = useSupabase();
 
  return useCallback(async () => {
    await client.auth.signOut();

    reloadWindow()

  }, [client]);
}
