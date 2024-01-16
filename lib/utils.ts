import { Task } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusDisplayValue(status: string) {
  // TODO - use dictionary
  if (status === "todo") {
    return "To Do"
  }

  if (status === "inprogress") {
    return "In Progress"
  }

  if (status === "done") {
    return "Done"
  }

  return "To Do"
}
