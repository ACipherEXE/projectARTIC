export interface UserDataInputProps {
  header: string;
  subText: string;
  buttonText: string;
  textboxPlaceholder: string;
  onChange: (value: string) => void;
  actionWanted: () => void;
  errorState?: boolean;
  errorStateText: string;
  success?: boolean;
  successText: string;
  value?: string;
}
export interface Student {
  student_uuid: string;
  firstName: string;
  lastName: string;
  emails: string;
  studentid: string;
  phoneNumber: string;
  grade: string;
  entry_uuid: string;
  date: string;
  time: string;
  is_late: boolean;
}
export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface EntryLogResponse {
  data: Student[];
  pagination: Pagination[];
}
