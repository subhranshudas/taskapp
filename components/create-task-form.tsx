"use client"

import * as React from "react"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import * as dictionary from '@/dictionaries'
import { Task } from "@/types"
import { createTaskAction, updateTaskAction } from "@/lib/actions/tasks"
import { toast } from "@/components/ui/use-toast"
import { ButtonLoader } from "@/components/button-loader"


const formSchema = z.object({
    title: z.string({
        required_error: 'title is required'
    })
        .min(5, 'title must be atleast 5 character(s)'),
    description: z.string()
        .max(200, 'description must be max 200 characters'),
    status: z.enum(["todo", "inprogress", "done"])
        .refine(val => val !== undefined, {
            message: "status is required and must be one of 'todo', 'inprogress', 'done'",
    }),
})


interface CreateTaskFormProps {
    onClose?: () => void // anytime the form is submitted or closed
    editable?: boolean
    task?: Task
}


export function CreateTaskForm({ onClose, editable, task } : CreateTaskFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: editable ? task?.title : "",
            description: editable ? task?.description || "" : "",
            status: editable ? task?.status : "todo"
        },
    })

    // gets called only on successful validation
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const editMode = editable && task
        let result: any = null

        try {
            if (editMode) {
                result = await updateTaskAction({ ...values, id: task.id })
            } else {
                result = await createTaskAction(values)
            }

            if (typeof onClose === 'function') {
                onClose()
            }

            toast({
                title: `${editMode ? 'Task updated successfully' : 'Task created successfully'}`,
                description: `Task ID - ${result.id}`
            })

        } catch (err) {
            toast({
                title: "task form submission error",
                description: JSON.stringify(err),
                variant: "destructive"
            })
        }
    }


    return (
        <div className="mx-auto w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-16">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="enter title..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="enter description..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="todo">Todo</SelectItem>
                                <SelectItem value="inprogress">In Progress</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col gap-y-2">
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ?  <ButtonLoader /> : 'Submit'}
                        </Button>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

