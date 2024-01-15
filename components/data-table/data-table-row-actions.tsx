"use client"

import * as React from "react"
import { DotsHorizontalIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { taskSchema, Task } from "./data/schema"
import { CreateTaskForm } from "../create-task-form"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)


  const onEdit = () => {
    console.log("editing: ", task)
  }

  const onDelete = () => {
    console.log("deleting: ", task)
    // call delete action
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={onEdit} className="flex justify-between cursor-pointer">
            Edit
            <Pencil2Icon color="green" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} className="flex justify-between cursor-pointer">
            Delete
            <TrashIcon color="red" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>

  )
}