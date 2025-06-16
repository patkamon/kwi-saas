import { AuthorInterface } from "./author";
import { ImageInterface } from "./image";

export interface NovelInterface {
    user_id: string; 
    image_id: string | undefined; 
    title: string;
    description: string;
    genre: string;
    novel_id: string;
    created_at: string;
    updated_at: string;

    author?: AuthorInterface;
    image?: ImageInterface
}