import { DialogProps } from '@material-ui/core/Dialog'

import { ButtonProps } from '@material-ui/core/Button'

export interface InformDialogProps extends DialogProps {
  onCancel: ButtonProps['onClick'],
  onConfirm: (email: string) => void,
  textTarget: React.ReactNode,
  showLoading?: boolean,
  error?: string,
}
