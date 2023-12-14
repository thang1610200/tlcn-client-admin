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
import { RegisterInstructor } from '@/app/types';
import { uniqBy } from 'lodash';

export const columns: ColumnDef<RegisterInstructor>[] = [
    {
        id: 'email',
        accessorKey: 'user.email',
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
        id: 'name',
        accessorKey: 'user.name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Tên
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'status',
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
            const status: string = row.getValue('status') || "";

            return (
                <Badge
                className={
                    status === 'PROGRESSING'
                      ? 'bg-sky-700'
                      : status === 'REJECT'
                      ? 'bg-red-700' // Thay 'bg-reject-color' bằng màu sắc phù hợp cho trạng thái REJECT
                      : status === 'SUCCESS'
                      ? 'bg-green-700' // Thay 'bg-success-color' bằng màu sắc phù hợp cho trạng thái SUCCESS
                      : ''
                  }
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'createdAt',
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
            const create_date = new Date(row.getValue('createdAt'));

            return <div>{create_date.toDateString()}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { token } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-4 p-0">
                            <span className="sr-only">Mở danh sách</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/certificate/${token}`}>
                            <DropdownMenuItem>
                                <Pencil className="w-4 h-4 mr-2" />
                                Chi tiết
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
