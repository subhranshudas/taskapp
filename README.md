# README

## Live URL
https://taskapp-ebon.vercel.app/

Please checkout the live production version of the Task Management app called **taskapp** in the above URL. Have a look at the [how to use](#how-to-use) for better clarity. 

Note - 
1. I have built it as a Frontend dev but since Supabase provides robust backend features like postgres database & client SDK, i have used Supabase as my BaaS.

2. Since it uses [Supabase](https://supabase.com/) as a Backend, if you want to run this locally please ask me for the `.env` values or you can create yours locally following the below [database design](#database-design)

## Tech-stack
* NextJS 14 (Full stack React with Server Components, Server Actions)
* Deployed on Vercel
* TailwindCSS
* Component Library - shadcn/ui
* Form component library - React Hook Form
* tanstack/query for data fetching and frontend caching
* Backend & Database - Supabase (A Postgres Wrapper on Steroids)
* [todo](#upcoming-improvements-in-pipeline)


## Features
* Auth enabled flow into the app (Sign Up with confirmation email, Sign In to use the app)
* Authenitcated user can fetch, create, update, delete tasks
* User is only authorized for their own user data & tasks data, no one else has access
* User can sort, filter from the list of tasks for easier access to data


## Database design
below is the entire database schema for the app. Supabase has an amazing AI SQL editor which allows you to generate scripts for your tables.
```sql
--- table for "user"
create table users (
  id uuid references auth.users not null primary key,
  photo_url text,
  display_name text,
  created_at timestamptz not null default now()
);

-- auth triggers

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, display_name, photo_url)
  values (new.id, new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data
  ->> 'photo_url');
  return new;
end;
$$;
 
-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- enable RLS
alter table users enable row level security;


-- users can only read and write their own user data- 
create policy "Users can read and update data belonging only their records" on
users
  for all
    using (auth.uid () = users.id)
    with check (auth.uid () = users.id);


-- tasks table
create table tasks (
  id uuid default gen_random_uuid() not null primary key,
  user_id uuid references users(id) not null,
  title text not null,
  description text,
  status text default 'todo' check (status in ('todo', 'inprogress', 'done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz
);


-- set up index
create index idx_user_id on tasks(user_id);


-- set up cascade rule for user delete
alter table tasks add constraint fk_user
  foreign key (user_id) 
  references users (id)
  on delete cascade;


-- enable RLS for tasks
alter table tasks enable row level security;


-- users can only read/update/delete their own tasks data
create policy "Users can read and update only the tasks belonging to them" on
tasks
  for all
    using (auth.uid () = tasks.user_id)
    with check (auth.uid () = tasks.user_id);
```

## How to Use
1. Open the app https://taskapp-ebon.vercel.app/ in a browser window/tab


## Upcoming Improvements In Pipeline
1. Finish the already created `dictionary` map for text content to make content dynamic.
2. Implement Vitest & Playwright testing for the app.


