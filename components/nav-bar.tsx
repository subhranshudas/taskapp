import Link from "next/link"

import { GitHubLogoIcon } from "@radix-ui/react-icons"

import { ThemeToggle } from '@/components/theme-toggle'
import { AppLogo } from "@/components/app-logo"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center">

        <Link href="/" title="Taskapp">
            <AppLogo />
        </Link>
        

        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="flex items-center">
            
            <ThemeToggle />

            <Link
              href="https://github.com/subhranshudas/taskapp"
              target="_blank"
              rel="noreferrer"
              title="Github Repo"
            >
              <GitHubLogoIcon className="h-4 w-4 mx-2" />
            </Link>
            
          </div>
        </div>
      </nav>
    </header>
  )
}

