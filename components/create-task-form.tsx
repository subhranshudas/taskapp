"use client"

import * as React from "react"
import Link from "next/link"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { OpenInNewWindowIcon  } from "@radix-ui/react-icons"

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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import * as dictionary from '@/dictionaries'
import { Task } from "./data-table/data/schema"


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



export function CreateTaskForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "todo"
        },
    })

    // gets called only on successful validation
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>{dictionary.common.createTaskButtonLabel}</Button>
            </DrawerTrigger>

            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="flex flex-col justify-center align-middle px-0">
                        <DrawerTitle className="flex justify-between">
                            {dictionary.common.createTaskButtonLabel}
                            
                            <Link href="/task/new">
                                <OpenInNewWindowIcon className="cursor-pointer" color="blue" />
                            </Link>
                        </DrawerTitle>
                        <DrawerDescription>{dictionary.common.createTaskInfo}</DrawerDescription>
                    </DrawerHeader>
                

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                            <DrawerFooter>
                                <Button type="submit">Submit</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>

                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
