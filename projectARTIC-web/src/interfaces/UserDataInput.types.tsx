export interface UserDataInputProps {
  header?: string;
  subText?: string;
  buttonText: string;
  textboxPlaceholder?: string;
  onChange?: (value: string) => void;
  actionWanted?: () => void;
  errorState?: boolean;
  errorStateText: string;
  success?: boolean;
  successText: string;
  value?: string;
  buttonInline?: boolean;
  shouldButtonBeShown?: boolean;
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
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  limit?: number;
}
// FIX: I messed up as the API is returning as data and not data and this is being used in the toolbox. This will need to be fixed but for now its works as intended
export interface EntryLogResponse {
  studentData: Student[];
  data: Student[];
  pagination: Pagination;
  errorDescription: string;
  wasSuccess: boolean;
  wasError: boolean;
  isLoading: boolean;
}
export interface searchStudentIDCall {
  errorDescription: string;
  wasSuccess: boolean;
  wasError: boolean;
  studentData: Student[];
}
