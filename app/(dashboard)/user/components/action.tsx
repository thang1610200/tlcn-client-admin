'use client';

import axios from 'axios';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modal/confirm-modal';
import { BACKEND_URL } from '@/lib/constant';
import { useSession } from 'next-auth/react';
import LoadingModal from '@/components/modal/loading-modal';

interface ActionsProps {
    email?: string;
}

export const Actions = ({
    email,
}: ActionsProps) => {
    const router = useRouter();
    const session = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(
                `${BACKEND_URL}/user/delete-user?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${session.data?.backendTokens.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            toast.success('User deleted');
            router.refresh();
            router.push(`/user`);
        } catch {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    if(isLoading){
        return (<LoadingModal />);
    }

    return (
        <div className="flex items-center gap-x-2">
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    );
};
