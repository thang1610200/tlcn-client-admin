'use client';

import Image from 'next/image';
import { User } from '@/app/types';

interface ImageFormProps {
    initialData?: User;
}

export const AvatarUser = ({ initialData }: ImageFormProps) => {
    return (
        <>
            <div className="p-4 mt-6 border rounded-md bg-slate-100">
                <div className="relative mt-2 aspect-video">
                    <Image
                        alt="Upload"
                        fill
                        className="object-cover rounded-md"
                        src={initialData?.image || ""}
                    />
                </div>
            </div>
        </>
    );
};
