export interface Task {
    id: string
    title: string
    description?: string | null
    status: "todo" | "inprogress" | "done"
}