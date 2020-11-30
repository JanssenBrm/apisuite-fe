import { Theme } from '../theme';
import { ButtonProps as MaterialButton } from '@material-ui/core';
export declare type ButtonProps = {
    btncolor?: string;
} & MaterialButton;
export declare type $ButtonProps = {
    btncolor?: string;
    theme: Theme;
};
