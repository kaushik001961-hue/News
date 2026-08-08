export type ReporterStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED";

export interface Reporter {
  id: string;

  reporterId: string | null;
  applicationNo: string;

  firstName: string;
  middleName?: string | null;
  lastName: string;

  email: string;
  phone: string;

  district: string | null;
  state: string | null;

  beat: string | null;
  designation: string | null;

  experience: number | null;

  photo: string | null;

  status: ReporterStatus;
}