import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from '@/components/nav-bar'


import './globals.css'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Taskap | A simple task management system',
  description: 'A simple task management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col bg-background">
              <Navbar />

              <main className="flex-1">{children}</main>

              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


function Footer() {
  return (
    <footer>App Footer goes here</footer>
  )
}