'use client';

import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyedMutator } from 'swr';

interface PersonalFormProps {
    initData?: {
        name: string;
        email: string;
        role: string;
    };
    mutate: KeyedMutator<any>;
}

const formSchema = z.object({
    name: z.string().readonly(),
    email: z.string().readonly(),
    role: z.string(),
});

const InformationUserRegister = ({ initData, mutate }: PersonalFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initData?.name,
            email: initData?.email,
            role: initData?.role,
        },
    });

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <Form {...form}>
                <form onSubmit={() => {}} className="space-y-4 mt-4">
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
                                        {...form.register('email')}
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
                                        {...form.register('name')}
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
                                <FormControl>
                                    <Input
                                        readOnly
                                        placeholder="e.g. 'Role'"
                                        {...form.register('role')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default InformationUserRegister;
