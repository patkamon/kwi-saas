export interface ChapterInterface {
    id: string;           // Unique identifier for the chapter
    name: string;
    title: string;
    desc: string;
    date: string;
    likes: number;
    comments: number;
    views?: number;
    content?: string; // Optional, if not always available
}
