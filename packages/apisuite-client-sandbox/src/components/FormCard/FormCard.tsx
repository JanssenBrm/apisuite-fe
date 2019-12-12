import * as React from 'react'
import { FormCardProps } from './types'
import useStyles from './styles'
import CloseIcon from '@material-ui/icons/Close'

const iconStyle = {
    height: '42px',
    width: '42px'
}

const FormCard: React.FC<FormCardProps> = (props) => {
    const {
        title,
        buttonLabel,
        closeRoute
    } = props

    const classes = useStyles()

    return (
        <div className={classes.formCard}>
            <a href={closeRoute}>
                <CloseIcon
                className={classes.closeIcon}
                style={iconStyle}
                />
            </a>
            <h2 className={classes.formTitle}>{title}</h2>
            {props.children}
            <button className={classes.submitBtn}>{buttonLabel}</button>
        </div>
    )
} 

export default FormCard
