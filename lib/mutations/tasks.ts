import { Database } from '@/types/database';
import { SupabaseClient } from '@supabase/supabase-js';
 
type Client = SupabaseClient<Database>;
 
interface InsertTaskParams {
  title: string;
  description?: string;
  status: string;
  user_id: string;
}
 
export async function insertTask(
  client: Client,
  params: InsertTaskParams
) {

  const { data, error } = await client
    .from('tasks')
    .insert(params)
    .select()

 
  if (error) {
    throw error;
  }
 
  return data;
}