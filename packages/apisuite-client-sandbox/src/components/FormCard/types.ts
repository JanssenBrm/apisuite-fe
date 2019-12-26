
export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
  buttonLabel: string,
  closeRoute: string,
  buttonDisabled: boolean,
  handleSubmit: () => void,
  children: React.ReactNodeArray,
}
