import 'server-only';
 
import { NextRequest, NextResponse } from 'next/server';
import createMiddlewareClient from '@/lib/supabase/middleware-client';
 
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient(req, res);
 
  console.log("middleware hits")

  await supabase.auth.getSession();
 
  return res;
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|static|favicon.ico).*)'],
}