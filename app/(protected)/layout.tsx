import { redirect } from 'next/navigation';
import loadSession from "@/lib/load-session";
 
async function AppLayout(
  props: React.PropsWithChildren
) {
  const session = await loadSession();
 
  // if the user is not logged in, we redirect them to the sign-in page
  if (!session) {
    redirect('/auth/sign-in');
  }
 
  return (
    <div>
      {props.children}
    </div>
  );
}
 
export default AppLayout;