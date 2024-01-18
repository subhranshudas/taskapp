import { Database } from '@/types/database';
import { SupabaseClient } from '@supabase/supabase-js';
 

type Client = SupabaseClient<Database>;



interface UpdateUserParams {
    id: string;
    display_name?: string;
    photo_url?: string;
  }
   
export async function updateUser(
    client: Client,
    { id, ...params } : UpdateUserParams
) {

    const { data, error } = await client
      .from('users')
      .update(params)
      .eq('id', id)
      .select()


    if (error) throw error

    return data
}