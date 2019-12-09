
export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    buttonLabel: string,
    closeRoute: string,
    children: React.ReactNodeArray
}
