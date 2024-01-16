import { DataTable } from '@/components/data-table'
import { columns } from '@/components/columns'
import { CreateTaskDrawer } from '@/components/create-task-drawer'
import { AppBanner } from '@/components/app-banner'


export default async function Home() {

  const tasks = await getTasks()

  // console.log("tasks: ", tasks)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
      
      <AppBanner />

      <div className='mt-6'>
        <CreateTaskDrawer />
      </div>
      
      
      <section className="my-16">
        <DataTable data={tasks} columns={columns} />
      </section>
      
    </main>
  )
}

// actual data call from DB
const getTasks = async (): Promise<any> => {
  return new Promise((resolve) => {

    function getRandomStatus() {
      const statuses = ["todo", "inprogress", "done"];
      const randomIndex = Math.floor(Math.random() * statuses.length);
      return statuses[randomIndex];
    }
    
    function generateRandomTask(id: string) {
      const adjectives = ["Awesome", "Amazing", "Fantastic", "Cool", "Epic"];
      const nouns = ["Task", "Project", "Assignment", "Job", "Mission"];
    
      const randomTitle =
        adjectives[Math.floor(Math.random() * adjectives.length)] +
        " " +
        nouns[Math.floor(Math.random() * nouns.length)];
    
      const randomDescription = `Description for ${randomTitle}`;
    
      return {
        id: id,
        title: randomTitle,
        description: randomDescription,
        status: getRandomStatus(),
      };
    }
    
    const taskData = [];
    
    for (let i = 1; i <= 50; i++) {
      taskData.push(generateRandomTask(i.toString()));
    }

    resolve(taskData);
  });
};
