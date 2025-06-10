export interface AuthorInterface {
  id: string;           // Unique identifier for the author
  name: string;
  profileImg: string;    // URL to the profile image
  joinedDate: string;    // ISO date string (e.g. "2021-04-12")
  bio: string;
}