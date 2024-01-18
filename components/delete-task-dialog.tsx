"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Task } from "@/types"
import { getStatusDisplayValue } from "@/lib/utils"


interface DeleteTaskDialogProps {
    task: Task
}

export function DeleteTaskDialog({ task } : DeleteTaskDialogProps) {
    const [open, setOpen] = React.useState<boolean>(true)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogDescription>
                    Once you delete, the task will be deleted forever!
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input
                            id="title"
                            disabled
                            value={task.title}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Input
                            id="description"
                            disabled
                            value={task.description as string}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Input
                            id="status"
                            disabled
                            value={getStatusDisplayValue(task.status)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="destructive" type="submit">Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
