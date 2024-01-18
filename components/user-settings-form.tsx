"use client"


import * as React from "react"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { updateUserAction } from "@/lib/actions/user"
import { toast } from "@/components/ui/use-toast"
import { Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter } from "@/components/ui/card"
import ImageUploader from '@/components/image-uploader'
import useSupabase from "@/lib/supabase/use-supabase"


interface UserSettingsFormProps {
    user: {
        id: string;
        email: string | undefined;
        photo_url: string | null;
        display_name: string | null;
    }

}


export function UserSettingsForm({ user } : UserSettingsFormProps) {
    const supabase = useSupabase()

    const [displayName, setDisplayName] = React.useState<string | null | undefined>(user.display_name)
    const [photoUrl, setPhotoUrl] = React.useState<string | null | undefined>(user.photo_url)

   
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        // 1st get the full url of the uploaded image
        const { data : { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(photoUrl || '')

        try {
           const result = await updateUserAction({ id: user.id ,display_name: displayName, photo_url: publicUrl })

           toast({
            title: 'User details updated successfully',
            description: `User Id - ${result.id}`
        })
        } catch (err) {
            toast({
                title: "user update submission error",
                description: JSON.stringify(err),
                variant: "destructive"
            })
            
        }
    };


    return (
        <Card className="w-[368px] md:w-4/5 lg:3/5">
            <CardHeader className="flex space-y-4">
                <CardTitle>User Settings</CardTitle>
                <CardDescription>You can make changes to some of your data here</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-8 w-full">
                    <div className="flex justify-between">
                        <label htmlFor="id" className="font-semibold">Id</label>
                        <input type="text" id="id" value={user.id} disabled className="w-2/3 text-muted-foreground border" />
                    </div>

                    <div className="flex justify-between">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="text" id="email" value={user.email} disabled className="w-2/3 text-muted-foreground border" />
                    </div>

                    <div className="flex justify-between">
                        <label htmlFor="displayName" className="font-semibold">Display Name</label>
                        <input type="text" id="displayName" value={displayName || ''} onChange={(e) => setDisplayName(e.target.value)} className="w-2/3 border"/>
                    </div>

                    <ImageUploader
                        uid={user.id}
                        url={photoUrl || ''}
                        size={150}
                        onUpload={(uploadedUrl) => {
                            console.log("will use RHF to orm.setValue('photoUrl', ) ", uploadedUrl)
                            setPhotoUrl(uploadedUrl)
                        }}
                    />

                    <div className="w-full flex justify-end">
                        <Button type="submit">Update</Button>
                    </div>
                
                </form>
            </CardContent>
        </Card>
    )
}


