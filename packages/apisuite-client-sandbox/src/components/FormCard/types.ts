
export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
  buttonLabel: string,
  closeRoute: string,
  buttonDisabled: boolean,
  loading: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  children: React.ReactNodeArray,
}
