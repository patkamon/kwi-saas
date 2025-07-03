export interface ImageInterface {
    image_id: string; // Unique identifier for the image
    image_path: string; // Path to the image file

    created_at: string; // Timestamp of when the image was uploaded
    updated_at: string; // Timestamp of when the image was last updated
    created_by: string; // User who uploaded the image
    type: string; // Type of image (e.g., 'character', 'novel', etc.)
  }