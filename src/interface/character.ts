import { ImageInterface } from "./image";

export interface CharacterInterface {
    name: string;
    description: string;
    novel_id: string;
    image_id: string | undefined;
    character_id: string;
    created_at: string;
    updated_at: string;

    image?: ImageInterface
  }
