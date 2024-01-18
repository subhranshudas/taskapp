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


interface UpdateTaskParams {
    title: string;
    description?: string;
    status: string;
  }
   
export async function updateTask(
    client: Client,
    params: UpdateTaskParams
) {
  
    const { data, error } = await client
      .from('tasks')
      .update(params)
      .eq('some_column', 'someValue')
      .select()
  
   
    if (error) {
      throw error;
    }
   
    return data;
}

interface DeleteTaskParams {
    id: string;
}

export async function deleteTask(
    client: Client,
    params: DeleteTaskParams
) {
  
    const { data, error } = await client
      .from('tasks')
      .delete()
      .eq('id', params.id)
      
    if (error) {
      throw error;
    }
    
    return data;
}