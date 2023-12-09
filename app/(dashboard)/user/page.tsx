'use client';

import { useSession } from 'next-auth/react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { useAllUser } from '@/app/hook/useAllUser';
import LoadingModal from '@/components/modal/loading-modal';

const UserPage = () => {
    const session = useSession();
    const {
        data: user = [],
        isLoading,
        error,
    } = useAllUser(session.data?.backendTokens.accessToken);

    if (isLoading) {
        return <LoadingModal />;
    }

    if (error) {
        return <div>Internal Server</div>;
    }

    return (
        <div className="p-6">
            <DataTable columns={columns} data={user} />
        </div>
    );
};

export default UserPage;
