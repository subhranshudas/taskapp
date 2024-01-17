'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Session } from '@supabase/supabase-js';
import { type ThemeProviderProps } from "next-themes/dist/types"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthChangeListener from "@/components/auth-change-listener";

import UserSessionProvider from "./user-session-provider";

 
function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

interface ProvidersProps extends React.PropsWithChildren<{}> {
  session: Session | undefined;
}

export default function Providers({ children, session }: ProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient())
 
  return (
    <AuthChangeListener session={session}>
      <UserSessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </UserSessionProvider>
    </AuthChangeListener>
  );
}
