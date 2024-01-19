"use client"

import * as React from "react"
import Link from "next/link"


import { FileSymlink  } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import * as dictionary from '@/dictionaries'
import { CreateTaskForm } from "./create-task-form"
import { Task } from "@/types"


interface CreateTaskDrawerProps {
    editable?: boolean
    task?: Task
    toggle?: (arg0: boolean) => void
}

export function CreateTaskDrawer({ editable, task, toggle } : CreateTaskDrawerProps) {
    const [open, setOpen] = React.useState<boolean>(!!editable)
    const editMode = (editable && task)


    const toggler = (boolValue: boolean) => {
        setOpen(boolValue);

        if (typeof toggle === "function") {
            toggle(boolValue)
        }
    }

    const formProps = {
        onClose: () => toggler(false),
        editable,
        task
    }

    return (
        <Drawer open={open} onOpenChange={toggler}>
            {editMode ?
                null : (
                    <DrawerTrigger asChild>
                        <Button>{dictionary.common.taskForm.create.buttonLabel}</Button>
                    </DrawerTrigger>
                )
            }
            
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="flex flex-col justify-center align-middle px-0">
                        <DrawerTitle className="flex justify-between">
                            {dictionary.common.taskForm[editMode ? 'edit' : 'create'].formHeader}
                            
                            {/* <Link href="/task/new" title={editMode ? 'Open Edit Task page' : 'Open Create Task page'}>
                                <FileSymlink
                                    className="cursor-pointer"
                                    color="#2563eb"
                                    size={24}
                                />
                            </Link> */}
                        </DrawerTitle>
                        <DrawerDescription>
                            {dictionary.common.taskForm[editMode ? 'edit' : 'create'].formInfo}
                        </DrawerDescription>
                    </DrawerHeader>
                
                    <CreateTaskForm {...formProps} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}
