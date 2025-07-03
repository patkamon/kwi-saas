import { ImageInterface } from "./image";

export interface AuthorInterface {
  user_id: string; // Unique identifier for the user
  name: string; // Name of the author
  image_id: string | undefined; // Optional, if not always available
  bio: string; // Short biography of the author
  credit: number; // Credit points or reputation score of the author
  subscription_plan: string;
  created_at: string; // Timestamp of when the author profile was created
  updated_at: string; // Timestamp of when the author profile was last updated

  image?: ImageInterface
}