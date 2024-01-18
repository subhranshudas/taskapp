"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Task } from "@/types"
import { getStatusDisplayValue } from "@/lib/utils"
import { deleteTaskAction } from "@/lib/actions/tasks"
import { toast } from "@/components/ui/use-toast"


interface DeleteTaskDialogProps {
    task: Task
    toggle: (arg0: boolean) => void
}

export function DeleteTaskDialog({ task, toggle } : DeleteTaskDialogProps) {
    const [open, setOpen] = React.useState<boolean>(true)

    const toggler = (boolValue: boolean) => {
        setOpen(boolValue);

        if (typeof toggle === "function") {
            toggle(boolValue)
        }
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const tasIdToBeDeleted = task.id
        
        try {
            const result: any = await deleteTaskAction({ id : tasIdToBeDeleted })

            toast({
                title: 'Task deleted successfully',
                description: `Task ID - ${result.id}`
            })

        } catch (err) {
            toast({
                title: "task form submission error",
                description: JSON.stringify(err),
                variant: "destructive"
            })
        } finally {
            setOpen(false)
        }
    };

    return (
        <Dialog open={open} onOpenChange={toggler}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogDescription>
                    Once you delete, the task will be deleted forever!
                </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
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

                    <Button variant="destructive" type="submit">Delete</Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}
