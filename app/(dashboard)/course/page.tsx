"use client";

import { useAllCourse } from "@/app/hook/useAllCourse";
import LoadingModal from "@/components/modal/loading-modal";
import { useSession } from "next-auth/react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useRouter } from "next/navigation";

const CoursesPage = () => {
    const session = useSession();
    const router = useRouter();
    const { data: course = [], isLoading, error } = useAllCourse(session.data?.backendTokens.accessToken);

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
            <DataTable data={course} columns={columns} />
        </div>
    )
}

export default CoursesPage;