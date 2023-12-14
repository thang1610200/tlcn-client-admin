'use client';

import Image from 'next/image';
import { RegisterInstructor } from '@/app/types';

interface ImageFormProps {
    initialData?: RegisterInstructor;
}

export const CertificateUser = ({ initialData }: ImageFormProps) => {
    return (
        <>
            <div className="p-4 mt-6 border rounded-md bg-slate-100">
                <div className="relative mt-2 aspect-video">
                    {initialData?.file && (
                        <Image
                            alt="Upload"
                            priority={true}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-md"
                            src={initialData?.file!}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
