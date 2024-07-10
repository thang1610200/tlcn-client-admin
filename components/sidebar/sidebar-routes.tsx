'use client';

import { BarChart, List, Book, User } from 'lucide-react';

import { SidebarItem } from './sidebar-item';

const routes = [
    {
        icon: List,
        label: 'Khóa học',
        href: '/course',
    },
    {
        icon: User,
        label: 'Người dùng',
        href: '/user'
    }
];

export const SidebarRoutes = () => {
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
};
