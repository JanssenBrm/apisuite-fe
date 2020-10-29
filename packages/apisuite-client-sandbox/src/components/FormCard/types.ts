
export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonLabel: string,
  closeRoute?: string,
  buttonDisabled: boolean,
  loading: boolean,
  error?: string | Error,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  children: React.ReactNode,
}
