export type NoticeProps = {
  // 'type' info, warning or error
  type?: "info"|"warning"|"error",
  // 'noticeIcon' may amount to a 'Material UI' icon
  noticeIcon?: JSX.Element,
  // 'noticeIconStyle' to override icon styling
  noticeIconStyle?: string,
  // 'noticeText' may amount to plain text, or e.g., a paragraph with links
  noticeText: string | JSX.Element,
}
