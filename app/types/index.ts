export interface User {
    name: string,
    email: string,
    image: string,
    bio?: string,
    facebook_id?: string
    youtube_id?: string
    titok_id?: string
    role: string;
}

export interface Course {
    id: string,
    title: string,
    isPublished: boolean,
    slug: string;
    description:string;
    learning_outcome: string[];
    requirement: string[];
    picture: string;
    topic_id: string;
    owner: User;
    userProgress: UserProgress[]
    create_at: Date
}

export interface UserProgress {
    id: string;
    userId: string;
    user: User,
    course: Course,
    courseId: string;
    isCompleted: boolean;
    isPassed: boolean;
    createdAt: Date;
}