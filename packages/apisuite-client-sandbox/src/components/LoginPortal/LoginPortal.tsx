import * as React from 'react'
import FormCard from 'components/FormCard'
import TextField from '@material-ui/core/TextField'
import useStyles from "./styles"
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Shuffle from '@material-ui/icons/Shuffle'

const LoginPortal: React.FC<{}> = () => {
    const classes = useStyles()

    const [showPassword, setShowPassword] = React.useState(false)

    const loginTitle = "Login"
    const loginButtonLabel = "Login"
    const closeRoute = "/"

    function handleClickShowPassword () {
        setShowPassword(!showPassword)
    }

    return(
        <div className={classes.loginContainer}>
        <div className={classes.content}>
            <FormCard title={loginTitle} buttonLabel={loginButtonLabel} closeRoute={closeRoute} >
                <div className={classes.fieldContainer}>
                    <h5 className={classes.fieldTitle}>E-mail address</h5>
                    <TextField
                    placeholder='example@cloudoki.com'
                    variant='outlined'
                    margin='none'
                    type='email'
                    autoFocus
                    fullWidth
                    InputProps={{
                        classes: { input: classes.emailTextfield },
                    }}
                    />
                </div>
                <div className={classes.fieldContainer}>
                    <h5 className={classes.fieldTitle}>Pass Phrase</h5>
                    <div className={classes.passPhraseContainer}>
                        <TextField
                        variant='outlined'
                        margin='none'
                        type={showPassword ? 'text' : 'password'}
                        autoFocus
                        fullWidth
                        InputProps={{
                            classes: { input: classes.passPhrasefield },
                        }}
                        />
                        <div className={classes.btnsContainer}>
                            <IconButton
                              onClick={handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityOff className={classes.visibilityIcon} /> : <Visibility className={classes.visibilityIcon} />}
                            </IconButton>
                            <IconButton>
                                <Shuffle className={classes.shuffleIcon} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </FormCard>
        </div>
    </div>
    )
} 

export default LoginPortal
