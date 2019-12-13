
import * as React from 'react'
import FormCard from 'components/FormCard'
import TextField from '@material-ui/core/TextField'
import useStyles from "./styles"
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Shuffle from '@material-ui/icons/Shuffle'

const RegisterPortal: React.FC<{}> = () => {
    const classes = useStyles()

    const [showPassword, setShowPassword] = React.useState(false)
    const [emailValue, setEmailValue] = React.useState('')
    const [nameValue, setNameValue] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [emailLastType, setEmailLastType] = React.useState(0)

    const registerTitle = "Registration"
    const registerButtonLabel = "Confirm"
    const closeRoute = "/"
    const typePause = 1000

    function handleClickShowPassword () {
        setShowPassword(!showPassword)
    }

    function handleEmailChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const currentTime = (new Date()).getTime()
        let lastType = emailLastType
        
        if (emailValue === '') {
            setEmailLastType(currentTime)
            lastType = currentTime
        }

        if (emailError || (currentTime - lastType > typePause)){
            setEmailError(!isValidEmail(emailValue))
        }

        setEmailValue(e.target.value)
        setEmailLastType(currentTime)

    }
    
    function isValidEmail (email: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(String(email).toLowerCase())
    }

    return(
            <div className={classes.registerContainer}>
                <div className={classes.content}>
                    <FormCard title={registerTitle} buttonLabel={registerButtonLabel} closeRoute={closeRoute} >
                        <div className={classes.fieldContainer}>
                            <h5 className={classes.fieldTitle}>GDPR protected</h5>
                            <TextField
                            placeholder='Your name'
                            variant='outlined'
                            margin='none'
                            type='text'
                            value={nameValue}
                            onChange={e => setNameValue(e.target.value)}
                            autoFocus
                            fullWidth
                            InputProps={{
                                classes: { input: classes.emailTextfield },
                            }}
                            />
                        </div>
                        <div className={classes.fieldContainer}>
                            <h5 className={classes.fieldTitle}>E-mail address</h5>
                            <TextField
                            id='email-field'
                            placeholder='example@cloudoki.com'
                            variant='outlined'
                            margin='none'
                            type='email'
                            value={emailValue}
                            onChange={handleEmailChange}
                            error={emailError}
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
                                fullWidth
                                InputProps={{
                                    classes: { input: classes.passPhrasefield },
                                }}
                                />
                                <div className={classes.btnsContainer}>
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff className={classes.visibilityIcon} /> : <Visibility className={classes.visibilityIcon}/>}
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

export default RegisterPortal
