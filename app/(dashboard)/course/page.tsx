"use client";

import { useAllCourse } from "@/app/hook/useAllCourse";
import LoadingModal from "@/components/modal/loading-modal";
import { useSession } from "next-auth/react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

const CoursesPage = () => {
    const session = useSession();
    const { data: course = [], isLoading, error } = useAllCourse(session.data?.backendTokens.accessToken);

    if (isLoading) {
        return <LoadingModal />;
    }

    return (
        <div className="p-6">
            <DataTable data={course} columns={columns} />
        </div>
    )
}

export default CoursesPage;