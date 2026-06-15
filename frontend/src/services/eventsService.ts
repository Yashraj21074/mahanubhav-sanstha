import { apiPublic, apiAdmin } from "./api";

export interface Event {
  EventID: string;
  EventTitle: string;
  MarathiTitle: string;
  HindiTitle: string;
  EnglishTitle: string;
  EventDate: string;
  StartTime: string;
  EndTime: string;
  VenueName: string;
  GoogleMapsLink: string;
  Description: string;
  YouTubeLiveLink: string;
  WhatsAppGroupLink: string;
  RegistrationStatus: "Open" | "Closed";
  EventStatus: "Active" | "Inactive";
  EventImageURL: string;
  CreatedDate: string;
}

export interface EventsResponse {
  success: boolean;
  data: Event[];
}

export async function getPublicEvents(): Promise<Event[]> {
  const res = await apiPublic<EventsResponse>("getEvents");
  return res.data || [];
}

export async function getAllEvents(): Promise<Event[]> {
  const res = await apiAdmin<EventsResponse>("getEvents");
  return res.data || [];
}

export async function addEvent(data: Partial<Event>): Promise<string> {
  const res = await apiAdmin<{ success: boolean; id: string }>("addEvent", { data });
  return res.id;
}

export async function updateEvent(id: string, data: Partial<Event>): Promise<void> {
  await apiAdmin("updateEvent", { id, data });
}

export async function deleteEvent(id: string): Promise<void> {
  await apiAdmin("deleteEvent", { id });
}
