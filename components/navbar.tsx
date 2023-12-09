'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export const Navbar = () => {
    const session = useSession();

    return (
        <NavigationMenu className="p-4 border-b h-full flex items-center bg-white shadow-sm max-w-none justify-end">
            <div className="flex justify-end space-x-2 cursor-pointer ">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative w-16 h-16 pr-0 rounded-full focus:ring-0 focus:ring-offset-0 hover:bg-inherit"
                        >
                            <Avatar className="w-full h-fit">
                                <AvatarImage
                                    src={session.data?.user.image}
                                    alt="User Image"
                                />
                                <AvatarFallback>User</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {session.data?.user.name}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {session.data?.user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href="/profile" legacyBehavior passHref>
                                <DropdownMenuItem>
                                    <NavigationMenuLink>
                                        Trang cá nhân
                                    </NavigationMenuLink>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="hover:bg-inherit"
                            onClick={() => {
                                signOut({ callbackUrl: '/login' });
                            }}
                        >
                            Đăng xuất
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </NavigationMenu>
    );
};
