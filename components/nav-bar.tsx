import Link from "next/link"
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle'
import UserMenu from "@/components/user-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center">

        <Link href="/" title="Taskapp">
          <span className="font-extrabold text-2xl text-blue-400">taskapp</span>
        </Link>
        

        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="flex items-center space-x-4">
              <ThemeToggle />
            
              <Link href='/auth/sign-in'>
                <Button>Sign In</Button>
              </Link>

              <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}

