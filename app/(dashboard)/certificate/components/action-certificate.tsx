'use client';

import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { BiPlusCircle } from 'react-icons/bi';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import Loader from '@/components/loader';
import * as z from 'zod';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/constant';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { RegisterInstructor, StatusRegisterInstructor } from '@/app/types';
import { Textarea } from '@/components/ui/textarea';
import { KeyedMutator } from 'swr';

const ActionFormSchema = z.object({
    reply: z
        .string()
        .max(1000, {
            message: 'Reply must not be longer than 1000 characters.',
        }),
    type: z.enum([
        StatusRegisterInstructor.Progressing,
        StatusRegisterInstructor.Success,
        StatusRegisterInstructor.Reject,
    ]),
});

type ActionFormValues = z.infer<typeof ActionFormSchema>;

interface ActionCertificateModalProps {
    initData?: RegisterInstructor,
    mutate: KeyedMutator<any>
}

const ActionCertificateModal: React.FC<ActionCertificateModalProps> = ({
    initData,
    mutate
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const session = useSession();

    const defaultValues: Partial<ActionFormValues> = {
        reply: initData?.reply || '',
        type: initData?.status,
    };

    const options: { label: string; value: StatusRegisterInstructor }[] = [
        {
            label: 'Progressing',
            value: StatusRegisterInstructor.Progressing,
        },
        {
            label: 'Success',
            value: StatusRegisterInstructor.Success,
        },
        {
            label: 'Reject',
            value: StatusRegisterInstructor.Reject,
        },
    ];

    const form = useForm<ActionFormValues>({
        resolver: zodResolver(ActionFormSchema),
        defaultValues,
    });

    function onSubmit(data: ActionFormValues) {
        setIsLoading(true);
        axios
            .patch(
                `${BACKEND_URL}/register-instructor/update-status`,
                {
                    token: initData?.token,
                    status: data.type,
                    reply: data.reply
                },
                {
                    headers: {
                        Authorization: `Bearer ${session.data?.backendTokens.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(() => {
                toast.success('Update success');
                handleCancel();
                mutate();
                router.refresh();
            })
            .catch((e) => {
                toast.error('Update failed!');
            })
            .finally(() => setIsLoading(false));
    }

    const handleCancel = () => {
        form.reset();
        setIsOpen(false);
    };

    return (
        <div>
            <div className="ml-auto" onClick={() => setIsOpen(true)}>
                <Button>
                    <BiPlusCircle className="w-4 h-4 mr-2" />
                    Action
                </Button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10 w-80"
                    onClose={() => {
                        setIsOpen(false);
                    }}
                >
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
                                        Action
                                    </Dialog.Title>
                                    <div className="w-full p-10 border-2 rounded-lg ">
                                        <Form {...form}>
                                            <form
                                                onSubmit={form.handleSubmit(
                                                    onSubmit
                                                )}
                                                className="space-y-8"
                                            >
                                                <div className="grid md:grid-cols-4 md:gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="type"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Trạng thái
                                                                </FormLabel>
                                                                <Popover>
                                                                    <PopoverTrigger
                                                                        asChild
                                                                    >
                                                                        <FormControl>
                                                                            <Button
                                                                                variant="outline"
                                                                                role="combobox"
                                                                                className={cn(
                                                                                    'w-full justify-between',
                                                                                    !field.value &&
                                                                                        'text-muted-foreground'
                                                                                )}
                                                                            >
                                                                                {field.value
                                                                                    ? options.find(
                                                                                          (
                                                                                              language
                                                                                          ) =>
                                                                                              language.value ===
                                                                                              field.value
                                                                                      )
                                                                                          ?.label
                                                                                    : 'Select option...'}
                                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-full p-0">
                                                                        <Command>
                                                                            <CommandInput placeholder="Search option..." />
                                                                            <CommandEmpty>
                                                                                No
                                                                                option
                                                                                found.
                                                                            </CommandEmpty>
                                                                            <CommandGroup>
                                                                                {options.map(
                                                                                    (
                                                                                        language
                                                                                    ) => (
                                                                                        <CommandItem
                                                                                            value={
                                                                                                language.label
                                                                                            }
                                                                                            key={
                                                                                                language.value
                                                                                            }
                                                                                            onSelect={() => {
                                                                                                form.setValue(
                                                                                                    'type',
                                                                                                    language.value,
                                                                                                    {
                                                                                                        shouldValidate:
                                                                                                            true,
                                                                                                    }
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <Check
                                                                                                className={cn(
                                                                                                    'mr-2 h-4 w-4',
                                                                                                    language.value ===
                                                                                                        field.value
                                                                                                        ? 'opacity-100'
                                                                                                        : 'opacity-0'
                                                                                                )}
                                                                                            />
                                                                                            {
                                                                                                language.label
                                                                                            }
                                                                                        </CommandItem>
                                                                                    )
                                                                                )}
                                                                            </CommandGroup>
                                                                        </Command>
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="reply"
                                                        render={({ field }) => (
                                                            <FormItem className="col-span-3">
                                                                <FormLabel>
                                                                    Phản hồi
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        disabled={
                                                                            isLoading
                                                                        }
                                                                        placeholder="e.g. 'Advanced Web Development'"
                                                                        {...form.register(
                                                                            'reply'
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription></FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid w-full grid-cols-2 px-10 gap-x-10 ">
                                                    {/* <Button type="button" onClick={() => { setIsDisable(false) }}>Update Profile</Button> */}
                                                    <Button
                                                        type="submit"
                                                        disabled={isLoading || (initData?.status !== "PROGRESSING")}
                                                        className="flex disabled:bg-slate-200 disabled:cursor-not-allowed"
                                                    >
                                                        {isLoading ? (
                                                            <Loader />
                                                        ) : (
                                                            'Continue'
                                                        )}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        onClick={handleCancel}
                                                        className="flex disabled:bg-slate-200 disabled:cursor-not-allowed"
                                                    >
                                                        Cancel
                                                    </Button>
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
    );
};

export default ActionCertificateModal;
