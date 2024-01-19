'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { Session } from '@supabase/supabase-js';
import { LogOut, LayoutDashboard, UserIcon, Settings2 } from 'lucide-react';

import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button"

import { useUserSession, useSignOut } from '@/lib/hooks';

function UserMenu() {  
  const pathname = usePathname()
  const session = useUserSession();
  const signOut = useSignOut();
  const displayName = useDisplayName(session);

  const isUserLoggedIn = !!(session && session.user)

  return isUserLoggedIn ? (    
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            {displayName}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/dashboard'}>
            <DropdownMenuItem className='cursor-pointer'>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
          <Link href={'/profile'}>
            <DropdownMenuItem className='cursor-pointer'>
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={signOut} className='cursor-pointer'>
          <LogOut className="mr-2 h-4 w-4 text-red-600" />
          <span className='text-red-600'>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href={pathname === "/auth/sign-in" ? '/auth/sign-up' : '/auth/sign-in'}>
      <Button>{pathname === "/auth/sign-in" ? 'Sign Up' : 'Sign In'}</Button>
    </Link>
  )
}

export default UserMenu;



function useDisplayName(session: Session | undefined) {
  return useMemo(() => {
    if (!session?.user) {
      return null;
    }

    const { email, user_metadata } = session.user;

    if (user_metadata?.full_name) {
      return user_metadata.full_name.substring(0, 2).toUpperCase();
    }

    if (email) {
      return email.substring(0, 2).toUpperCase();
    }

    return <UserIcon className='h-4' />
  }, [session]);
}