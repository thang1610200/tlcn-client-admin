'use client';

import { IconBadge } from '@/components/icon-bagde';
import { Image, LayoutDashboard } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingModal from '@/components/modal/loading-modal';
import { useDetailRegisterInstructor } from '@/app/hook/useDetailRegisterInstructor';
import InformationUserRegister from '../components/infor-user-register';
import { CertificateUser } from '../components/certificate-image';
import ActionCertificateModal from '../components/action-certificate';

const RegisterInstructorDetail = ({ params }: { params: { token: string } }) => {
    const session = useSession();
    const { data, isLoading, error, mutate } = useDetailRegisterInstructor(session.data?.backendTokens.accessToken, params.token);

    if (isLoading) {
        return <LoadingModal />;
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Thông tin người dùng
                    </h1>
                </div>
                <ActionCertificateModal mutate={mutate} initData={data} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Thông tin cá nhân</h2>
                    </div>
                    <InformationUserRegister mutate={mutate} initData={data?.user} />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Image} />
                            <h2 className="text-xl">
                                Chứng chỉ
                            </h2>
                        </div>
                        <CertificateUser initialData={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterInstructorDetail;
