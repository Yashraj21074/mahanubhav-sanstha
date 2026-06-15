import { apiPublic, apiAdmin } from "./api";

export interface Registration {
  RegistrationID: string;
  EventID: string;
  EventName: string;
  FullName: string;
  MobileNumber: string;
  Email: string;
  MandalName: string;
  CityArea: string;
  NumberOfPeople: string;
  SpecialNote: string;
  RegistrationDateTime: string;
}

export interface RegistrationFormData {
  EventID: string;
  EventName: string;
  FullName: string;
  MobileNumber: string;
  Email: string;
  MandalName: string;
  CityArea: string;
  NumberOfPeople: number;
  SpecialNote: string;
}

interface ApiResponse {
  success: boolean;
  data?: Registration[];
  id?: string;
}

export async function submitRegistration(data: RegistrationFormData): Promise<string> {
  const res = await apiPublic<ApiResponse>("submitRegistration", { data });
  return res.id || "";
}

export async function getRegistrations(eventId?: string, search?: string): Promise<Registration[]> {
  const res = await apiAdmin<ApiResponse>("getRegistrations", {
    ...(eventId ? { eventId } : {}),
    ...(search ? { search } : {}),
  });
  return res.data || [];
}

export async function deleteRegistration(id: string): Promise<void> {
  await apiAdmin("deleteRegistration", { id });
}

export async function exportRegistrations(): Promise<Registration[]> {
  const res = await apiAdmin<ApiResponse>("exportRegistrations");
  return res.data || [];
}
