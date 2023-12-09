'use client';

import React, { Fragment, useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, Transition } from '@headlessui/react'
import { Button } from "@/components/ui/button";
import { BiPlusCircle } from "react-icons/bi"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/loader";
import * as z from "zod";
import axios from 'axios';
import { BACKEND_URL } from '@/lib/constant';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const courseTitleFormSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: "Title must be at least 2 characters.",
        })
        .max(100, {
            message: "Title must not be longer than 100 characters.",
        }),
})


type courseTitleFormValues = z.infer<typeof courseTitleFormSchema>;

export default function CreateUserModal() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const session = useSession();

    const defaultValues: Partial<courseTitleFormValues> = {
        title: "",
    };

    const form = useForm<courseTitleFormValues>({
        resolver: zodResolver(courseTitleFormSchema),
        defaultValues,
    })

    function onSubmit(data: courseTitleFormValues) {
        setIsLoading(true);
        axios.post(`${BACKEND_URL}/course/create-course`, {
            title: data.title,
            email: session.data?.user.email
        }, {
            headers: {
                Authorization: `Bearer ${session.data?.backendTokens.accessToken}`,
                "Content-Type": "application/json"
            }
        }).then(() => {
            toast.success('Create success');
            handleCancel();
            router.refresh();
        })
            .catch((e) => {
                toast.error('Create failed!');
            })
            .finally(() => setIsLoading(false));
    }

    const handleCancel = () => {
        form.reset();
        setIsOpen(false)
    }

    return (
        <div>
            <div className="ml-auto" onClick={() => setIsOpen(true)}>
                <Button variant={"default"}>
                    <BiPlusCircle className="w-4 h-4 mr-2" />
                    Tạo người dùng mới
                </Button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 w-80" onClose={() => { setIsOpen(false) }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full gap-5 p-4 ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-1/2 p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="flex justify-center p-4 text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Tạo khóa học mới
                                    </Dialog.Title>
                                    <div className="w-full p-10 border-2 rounded-lg ">
                                        <Form {...form}>

                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                                <FormField
                                                    control={form.control}
                                                    name="title"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Course title</FormLabel>
                                                            <FormControl>
                                                                <Input disabled={isLoading} placeholder="e.g. 'Advanced Web Development'" {...form.register("title")} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Bạn sẽ dạy gì trong khóa học này
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="grid w-full grid-cols-2 px-10 gap-x-10 ">
                                                    
                                                    <Button type="submit" disabled={isLoading} className="flex disabled:bg-slate-200 disabled:cursor-not-allowed" >{isLoading ? <Loader /> : 'Tiếp tục'}</Button>
                                                    <Button type="button" onClick={handleCancel} className="flex disabled:bg-slate-200 disabled:cursor-not-allowed">Hủy bỏ</Button>
                                                </div>
                                            </form>
                                        </Form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
