import { DialogProps } from "@material-ui/core/Dialog";

export interface CustomizableDialogProps extends DialogProps {
  // Props passed by the 'calling' component to be added below
  open: boolean,
  providedTitle: string,
  providedText: string,
  providedDialogContent?: any,
  confirmButtonLabel?: string,
  cancelButtonLabel?: string,
  openDialogCallback?: (...args: any[]) => any,
  closeDialogCallback?: (...args: any[]) => any,
  confirmButtonCallback: (...args: any[]) => any,
  confirmButtonProps?: {
    [key: string]: any
  },
  cancelButtonProps?: {
    [key: string]: any
  },
  providedDialogActions?: {
    [key: string]: any
  },

  // 'mapStateToProps' props (i.e., coming from the app's Redux 'store') to be added below (if any)
}