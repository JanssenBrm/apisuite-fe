import * as React from 'react'
import { FormCardProps } from './types'
import useStyles from './styles'
import CloseIcon from '@material-ui/icons/Close'

const FormCard: React.FC<FormCardProps> = (props) => {
    const {
        title,
        buttonLabel,
        closeRoute
    } = props

    const classes = useStyles()

    return (
        <div className={classes.formCard}>
            <a className={classes.closeIcon} href={closeRoute}>
                <CloseIcon />
            </a>
            <h2 className={classes.formTitle}>{title}</h2>
            {props.children}
            <button className={classes.submitBtn}>{buttonLabel}</button>
        </div>
    )
} 

export default FormCard
