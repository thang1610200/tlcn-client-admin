'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Course, UserProgress } from '@/app/types';
import { uniqBy } from 'lodash';

export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Khóa học
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
    },
    {
        id: 'email',
        accessorKey: 'owner.email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Email
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'isPublished',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Trạng thái
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const isPublished = row.getValue('isPublished') || false;

            return (
                <Badge
                    className={cn('bg-slate-500', isPublished && 'bg-sky-700')}
                >
                    {isPublished ? 'Published' : 'Draft'}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'userProgress',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Số lượng người dùng
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const data: UserProgress[] = row.getValue('userProgress') || [];
            const count = uniqBy(data,'userId');
            return <div className='text-center'>{count.length}</div>
        },
    },
    {
        accessorKey: 'create_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Ngày tạo
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const create_date = new Date(row.getValue('create_at'));

            return <div>{create_date.toDateString()}</div>;
        },
    },
    // {
    //     id: 'actions',
    //     cell: ({ row }) => {
    //         const { slug } = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="w-8 h-4 p-0">
    //                         <span className="sr-only">Mở danh sách</span>
    //                         <MoreHorizontal className="w-4 h-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <Link href={`/course/${slug}`}>
    //                         <DropdownMenuItem>
    //                             <Pencil className="w-4 h-4 mr-2" />
    //                             Chi tiết
    //                         </DropdownMenuItem>
    //                     </Link>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];
