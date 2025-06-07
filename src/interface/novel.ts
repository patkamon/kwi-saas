export interface NovelInterface {
    id: string;
    name: string;
    title: string;
    desc: string;
    time: string;
    tags: string[];
    img: string; // URL to the novel cover image
    views?: number; // Optional, if not always available
    likes?: number; // Optional, if not always available
}