'use server';

// import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import getSupabaseServerActionClient from '@/lib/supabase/action-client';
import { updateUser } from '@/lib/mutations/user';


export async function updateUserAction(formData: any) {
    const id = formData['id'];
    const display_name = formData['display_name'];
    const photo_url = formData['photo_url'];
  
  
    const client = getSupabaseServerActionClient();
    const { error } = await client.auth.getUser();
  
    if (error) {
      throw error;
    }
  
    // insert the post into the database
    const [result] = await updateUser(client, {
      id,
      display_name,
      photo_url,
    });
  
    revalidatePath(`/profile`, 'page');
  
    return result
  }
  