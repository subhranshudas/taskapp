import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"


export function Footer() {
    return (
        <footer className="py-6 md:px-8 md:py-0 border-t-[1px]">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
               <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    <span>&copy;</span>Taskapp private limited
                </p>
               <Link
                    href="https://github.com/subhranshudas/taskapp"
                    target="_blank"
                    rel="noreferrer"
                    title="Github Repo"
                >
                    <GitHubLogoIcon className="h-4 w-4 mx-2" />
                </Link>
            </div>
      </footer>
    )
}