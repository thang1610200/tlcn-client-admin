'use client';

import { IconBadge } from '@/components/icon-bagde';
import { Image, LayoutDashboard } from 'lucide-react';
import PersonalInformation from '../components/infor-user';
import { useDetailUser } from '@/app/hook/useDetailUser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingModal from '@/components/modal/loading-modal';
import queryString from 'query-string';
import { Actions } from '../components/action';
import { AvatarUser } from '../components/avatar';

const UserDetail = ({ params }: { params: { email: string } }) => {
    const session = useSession();
    const router = useRouter();
    const { data, isLoading, error, mutate } = useDetailUser(
        session.data?.backendTokens.accessToken,
        params.email
    );

    if (isLoading || session.status === 'loading') {
        return <LoadingModal />;
    }

    if (error) {
        return router.back();
    }

    if(session.status === 'unauthenticated') {
        return router.push("/");
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Thông tin người dùng
                    </h1>
                </div>
                <Actions email={data?.email} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Thông tin cá nhân</h2>
                    </div>
                    <PersonalInformation mutate={mutate} initData={data} />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Image} />
                            <h2 className="text-xl">
                                Ảnh đại diện
                            </h2>
                        </div>
                        <AvatarUser
                            initialData={data} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
