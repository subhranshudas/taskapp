'use client'

import React, { useEffect, useState } from 'react'
import { Database } from '@/types/database'
import useSupabase from "@/lib/supabase/use-supabase"
import Image from 'next/image'
import { PlusCircledIcon } from "@radix-ui/react-icons"


type Users = Database['public']['Tables']['users']['Row']

export default function ImageUploader({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: Users['photo_url']
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = useSupabase()

  const [avatarUrl, setAvatarUrl] = useState<Users['photo_url']>(url)
  const [uploading, setUploading] = useState(false)


  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <p className='mb-2'>Profile Pic</p>
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image outline"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image border-[1px] flex justify-center items-center" style={{ height: size, width: size }}>
            <span className="text-muted-foreground">no image!</span>
        </div>
      )}

      <label
        htmlFor='single'
        className='flex space-x-0 justify-center items-center my-4 py-2 border-2 bg-green-600 hover:bg-green-600/90 text-white font-medium cursor-pointer'
        style={{ width: size }}
      >
        <PlusCircledIcon className="mr-2 h-4 w-4" /> {uploading ? 'Uploading ...' : 'Upload'}
        <input
            style={{
                visibility: 'hidden',
                position: 'absolute',
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
        />
      </label>

      {/* <div style={{ width: size }} className={`my-4 ${uploading ? 'cursor-disabled': 'cursor-pointer'} px-4 py-2 bg-green-700 hover:bg-green-700/90`}>
        <label htmlFor="single" className='text-white'>{uploading ? 'Uploading ...' : 'Upload'}</label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div> */}
    </div>
  )
}