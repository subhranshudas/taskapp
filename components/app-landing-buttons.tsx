"use client"

import * as React from "react"

import Link from "next/link";
import { Button } from '@/components/ui/button';
import { UserSessionContext } from "@/lib/context";



export function AppLandingButtons() {
    const { session } = React.useContext(UserSessionContext)
    console.log("AppLandingButtons SESSION CONTEXT: ", session?.access_token.slice(0, 10))

    const isUserLoggedIn = session && session.user


    return (
        <div className='flex flex-col space-y-3'>
            <div className='flex space-x-4 justify-center'>
                
                {isUserLoggedIn ? (
                    <Link href='/dashboard'>
                        <Button>Go to Dashboard</Button>
                    </Link>
                    ) : (
                    <Link href='/auth/sign-up'>
                        <Button>Create an Account</Button>
                    </Link>
                )}
                
                {!isUserLoggedIn ? (
                    <Link href='/auth/sign-in'>
                        <Button variant="secondary">Sign In</Button>
                    </Link>
                ) : null}
            
            </div>
        </div>
    )
}