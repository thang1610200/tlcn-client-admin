import useSwr from 'swr';
import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@/lib/constant';
import { Course } from '../types';

const fetcher = async ([url, token]: [string, string]) => {
    const res = await axios.get(url,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

export const useAllCourse = (token?: string) => {
    const { data, error, isLoading, mutate} = useSwr<Course[], AxiosError>(token ? [`${BACKEND_URL}/course/admin/all-course`,token]: null, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,       // nếu khi gọi dữ liệu bị lỗi thì sẽ gọi lại (true)
    })

    return {
        data,
        error,
        isLoading,
        mutate
    }
}