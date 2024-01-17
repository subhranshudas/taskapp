import { Database } from '@/types/database';
import { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

export async function fetchTasks(client: Client, userId: string) {
  return client
    .from('tasks')
    .select(
      `
      id,
      title,
      description,
      status
    `
    )
    .eq('user_id', userId);
}
