export interface ChapterInterface {
    id: string;           // Unique identifier for the chapter
    title: string;
    desc: string;
    date: string;
    likes: number;
    comments: number;
    views?: number;
    content?: string; // Optional, if not always available
    novelId: string; // Identifier for the novel this chapter belongs to
}
