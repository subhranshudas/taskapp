import { AppLandingButtons } from "@/components/app-landing-buttons";

 
export default function Home() {

  return (
    <div className='container'>
      <div className='flex flex-col space-y-14'>
        <div className='flex flex-col space-y-8'>
          <h1 className='mt-16 text-4xl lg:text-6xl 2xl:text-7xl font-semibold text-center max-w-4xl mx-auto'>
            The Best Task Management App around!
          </h1>
 
          <h2 className='text-center text-lg xl:text-2xl text-gray-400  font-light'>
            <p>
              Taskapp is a user-friendly task management app that empowers users to effortlessly create, update, and delete tasks.
            </p>
 
            <p>
              With robust filtering and sorting capabilities, it enhances productivity by allowing seamless organization and customization of tasks to suit individual preferences.
            </p>
 
          </h2>
        </div>

        <div className='flex justify-center'>
          <span className='py-2 px-4 rounded-full shadow dark:shadow-gray-500 text-sm'>
            Plan, execute. Crush your goals.
          </span>
        </div>
 
        <AppLandingButtons />

      </div>
    </div>
  )
}