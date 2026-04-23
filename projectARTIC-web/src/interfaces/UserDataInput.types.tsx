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
}
