"use client";

import { useAllCertificate } from "@/app/hook/useAllCertificate";
import LoadingModal from "@/components/modal/loading-modal";
import { useSession } from "next-auth/react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

const CertificatePage = () => {
    const session = useSession();
    const { data: certificate = [], isLoading } = useAllCertificate(session.data?.backendTokens.accessToken);

    if(isLoading){
        return (
            <LoadingModal />
        );
    }

    return (
        <div className="p-6">
            <DataTable data={certificate} columns={columns} />
        </div>
    )
}

export default CertificatePage;