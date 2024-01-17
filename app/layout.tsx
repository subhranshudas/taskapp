import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"

import { use } from 'react'
import loadSession from "@/lib/load-session";

import { cn } from "@/lib/utils"
import { Navbar } from '@/components/nav-bar'
import { Footer } from '@/components/app-footer'
import { Toaster } from "@/components/ui/toaster"

import './globals.css'
import Providers from '@/components/providers'


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Taskap | A simple task management system',
  description: 'A simple task management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = use(loadSession());

  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers session={session}>
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col bg-background">
              <Navbar />

              <main className="flex-1">{children}</main>

              <Footer />
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
