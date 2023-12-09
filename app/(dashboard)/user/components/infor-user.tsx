'use client';

import * as z from 'zod';
import axios from 'axios';
import {
    Form,
    FormControl,
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { BACKEND_URL } from '@/lib/constant';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { KeyedMutator } from 'swr';

interface PersonalFormProps {
    initData?: {
        name: string;
        email: string;
        role: string;
    };
    mutate: KeyedMutator<any>
}

const formSchema = z.object({
    name: z.string().readonly(),
    email: z.string().readonly(),
    role: z.string(),
});

const PersonalInformation = ({ initData, mutate }: PersonalFormProps) => {
    const router = useRouter();
    const session = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initData?.name,
            email: initData?.email,
            role: initData?.role,
        },
    });

    const options = [
        {
            label: "Admin",
            value: "ADMIN"
        },{
            label: "Learner",
            value: "LEARNER"
        },{
            label: "Instructor",
            value: "INSTRUCTOR"
        }
    ]

    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.put(
                `${BACKEND_URL}/user/update-role`,
                {
                    email: initData?.email,
                    role: values.role
                },
                {
                    headers: {
                        Authorization: `Bearer ${session.data?.backendTokens.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success('Role updated');
            router.refresh();
            mutate()
        } catch {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly
                                        placeholder="e.g. 'abc@gmail.com'"
                                        {...form.register(
                                            'email'
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ và tên</FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly
                                        placeholder="e.g. 'Nguyen Van A'"
                                        {...form.register(
                                            'name'
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
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
                                                          (language) =>
                                                              language.value ===
                                                              field.value
                                                      )?.label
                                                    : 'Select option...'}
                                                <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search option..." />
                                            <CommandEmpty>
                                                Không tìm thấy tùy chọn
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {options.map((language) => (
                                                    <CommandItem
                                                        value={language.label}
                                                        key={language.value}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'role',
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
                                                        {language.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                        >
                            Lưu lại
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default PersonalInformation;
