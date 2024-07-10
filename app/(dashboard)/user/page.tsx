'use client';

import { useSession } from 'next-auth/react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { useAllUser } from '@/app/hook/useAllUser';
import LoadingModal from '@/components/modal/loading-modal';
import { useRouter } from 'next/navigation';

const UserPage = () => {
    const session = useSession();
    const router = useRouter();
    const {
        data: user = [],
        isLoading,
        error,
    } = useAllUser(session.data?.backendTokens.accessToken);

    if (isLoading || session.status === 'loading') {
        return <LoadingModal />;
    }

    if (error) {
        return <div>Internal Server</div>;
    }

    if(session.status === 'unauthenticated') {
        return router.push("/");
    }

    return (
        <div className="p-6">
            <DataTable columns={columns} data={user} />
        </div>
    );
};

export default UserPage;
