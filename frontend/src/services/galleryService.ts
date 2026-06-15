import { apiPublic, apiAdmin } from "./api";

export interface GalleryItem {
  GalleryID: string;
  Year: string;
  EventName: string;
  GooglePhotosAlbumLink: string;
  EventDate: string;
  Description: string;
  CoverImageURL: string;
  CreatedDate: string;
}

interface ApiResponse {
  success: boolean;
  data?: GalleryItem[];
  id?: string;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const res = await apiPublic<ApiResponse>("getGallery");
  return res.data || [];
}

export async function addGallery(data: Partial<GalleryItem>): Promise<string> {
  const res = await apiAdmin<ApiResponse>("addGallery", { data });
  return res.id || "";
}

export async function updateGallery(id: string, data: Partial<GalleryItem>): Promise<void> {
  await apiAdmin("updateGallery", { id, data });
}

export async function deleteGallery(id: string): Promise<void> {
  await apiAdmin("deleteGallery", { id });
}

export function groupGalleryByYear(items: GalleryItem[]): Record<string, GalleryItem[]> {
  const grouped: Record<string, GalleryItem[]> = {};
  items.forEach(item => {
    const year = item.Year || "Unknown";
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(item);
  });
  return grouped;
}
