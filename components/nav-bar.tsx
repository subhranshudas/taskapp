import Link from "next/link"
import { Button } from '@/components/ui/button';

import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { ThemeToggle } from '@/components/theme-toggle'


export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center">

        <Link href="/" title="Taskapp">
          <span className="font-extrabold text-2xl text-blue-400">taskapp</span>
        </Link>
        

        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="flex items-center space-x-2">
            
              <ThemeToggle />
            
              <Link href='/auth/sign-in'>
                <Button>Sign In</Button>
              </Link>
            
          </div>
        </div>
      </nav>
    </header>
  )
}

