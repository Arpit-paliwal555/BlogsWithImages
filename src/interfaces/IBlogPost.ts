export interface IBlogpost{
    id: number;
    title: string;
    description: string;
    viewCount: number;
    publishedAt: string;
    user: {
        id: number;
        username: string;
    }
}