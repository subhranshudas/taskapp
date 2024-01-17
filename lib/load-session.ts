import getSupabaseServerComponentClient from "@/lib/supabase/server-component-client";
import { cache } from "react";
 
const loadSession = cache(async () => {
  const client = getSupabaseServerComponentClient();
  const { data } = await client.auth.getSession();
 
  return data.session ?? undefined;
});
 
export default loadSession;