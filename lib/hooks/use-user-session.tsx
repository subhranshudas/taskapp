"use client"

import { useContext } from "react";
import { UserSessionContext } from "@/lib/context";
 
export function useUserSession() {
  const { session } = useContext(UserSessionContext);
 
  return session;
}
