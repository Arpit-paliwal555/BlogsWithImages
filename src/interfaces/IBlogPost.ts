export interface IBlogpost{
    id: number;
    title: string;
    description: string;
    viewCount: number;
    publishedAt: string;
    imageUrl?: string;
    user: {
        id: number;
        username: string;
    }
}