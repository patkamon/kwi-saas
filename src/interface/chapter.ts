import { NovelInterface } from "./novel";
import { AuthorInterface } from "./author";
import { ImageInterface } from "./image";

export interface ChapterInterface {
    novel_id: string; // Identifier for the novel this chapter belongs to
    chapter_id: string; // Unique identifier for the chapter
    image_id: string | undefined; // Optional, if not always available
    content: string;
    title: string; // Title of the chapter
    views: number;
    created_at: string; // Timestamp of when the chapter was created
    updated_at: string; // Timestamp of when the chapter was last updated

    novel?: NovelInterface
    author?: AuthorInterface
    image?: ImageInterface
}
