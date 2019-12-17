
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
    const [passValue, setPassValue] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const [passError, setPassError] = React.useState(false)
    const [nameError, setNameError] = React.useState(false)
    const [focusedField, setFocusedField] = React.useState('name-field')
    const [filledName, setFilledName] = React.useState(false)
    const [filledEmail, setFilledEmail] = React.useState(false)
    const [filledPass, setFilledPass] = React.useState(false)
    const [buttonDisabled, setButtonDisabled] = React.useState(true)

    const nameFieldId = 'name-field'
    const emailFieldId = 'email-field'
    const passFieldId = 'pass-field'
    const registerTitle = "Registration"
    const registerButtonLabel = "Confirm"
    const closeRoute = "/"
    const passMinLength = 12

    function handleClickShowPassword () {
        setShowPassword(!showPassword)
    }

    function handleNameChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newName = e.target.value
        setNameValue(newName)
        if (nameError) {
            setNameError(!isValidName(newName))
        }
        isFormValid(newName, emailValue, passValue)
    }

    function handleEmailChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newEmail = e.target.value
        setEmailValue(newEmail)
        if (emailError) {
            setEmailError(!isValidEmail(newEmail))
        }
        isFormValid(nameValue, newEmail, passValue)
    }

    function handlePassChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newPass = e.target.value
        setPassValue(newPass)
        if (passError) {
            setPassError(!isValidPass(newPass))
        }
        isFormValid(nameValue, emailValue, newPass)
    }

    function handleInputFocus (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFocusedField(e.target.id)
    }
    
    function isValidEmail (email: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(String(email).toLowerCase())
    }

    function isValidPass (pass: string) {
        const uppercase = /[A-Z]/ 
        const lowercase = /[a-z]/
        const symbol = /[\W]{1,}/
        const passLength = (pass.length >= passMinLength)
        return ( uppercase.test(pass) && lowercase.test(pass) && symbol.test(pass) && passLength )
    }

    function isValidName (name: string) {
        return ( name.length > 0 )
    }

    function isFormValid (name: string, email: string, pass: string) {
        setButtonDisabled(!( filledName && filledEmail && filledPass && isValidName(name) && isValidEmail(email) && isValidPass(pass) ))
    }

    React.useEffect(() => {
        if (focusedField === nameFieldId) {
            setFilledName(true)
            if (filledEmail) {
                setEmailError(!isValidEmail(emailValue))
            }
            if (filledPass) {
                setPassError(!isValidPass(passValue))
            }
        } else if (focusedField === emailFieldId) {
            setFilledEmail(true)
            if (filledPass) {
                setPassError(!isValidPass(passValue))
            }
            if (filledName) {
                setNameError(!isValidName(nameValue))
            }
        } else if (focusedField === passFieldId) {
            setFilledPass(true)
            if (filledEmail) {
                setEmailError(!isValidEmail(emailValue))
            }
            if (filledName) {
                setNameError(!isValidName(nameValue))
            }
        }
    }, [focusedField])

    return(
            <div className={classes.registerContainer}>
                <div className={classes.content}>
                    <FormCard title={registerTitle} buttonLabel={registerButtonLabel} buttonDisabled={buttonDisabled} closeRoute={closeRoute} >
                        <div className={classes.fieldContainer}>
                            <h5 className={classes.fieldTitle}>GDPR protected</h5>
                            <TextField
                            id={nameFieldId}
                            placeholder='Your name'
                            variant='outlined'
                            margin='none'
                            type='text'
                            value={nameValue}
                            onChange={handleNameChange}
                            autoFocus
                            onFocus={handleInputFocus}
                            error={nameError}
                            fullWidth
                            InputProps={{
                                classes: { input: classes.emailTextfield },
                            }}
                            />
                            { nameError ? <div className={classes.alert}>Your name must be at least one caracter long.</div> : null }
                        </div>
                        <div className={classes.fieldContainer}>
                            <h5 className={classes.fieldTitle}>E-mail address</h5>
                            <TextField
                            id={emailFieldId}
                            placeholder='example@cloudoki.com'
                            variant='outlined'
                            margin='none'
                            type='email'
                            value={emailValue}
                            onChange={handleEmailChange}
                            onFocus={handleInputFocus}
                            error={emailError}
                            fullWidth
                            InputProps={{
                                classes: { input: classes.emailTextfield },
                            }}
                            />
                            { emailError ? <div className={classes.alert}>Please enter a valid email address.</div> : null }
                        </div>
                        <div className={classes.fieldContainer}>
                            <h5 className={classes.fieldTitle}>Pass Phrase</h5>
                            <div className={classes.passPhraseContainer}>
                                <TextField
                                id={passFieldId}
                                variant='outlined'
                                margin='none'
                                type={showPassword ? 'text' : 'password'}
                                value={passValue}
                                fullWidth
                                onChange={handlePassChange}
                                onFocus={handleInputFocus}
                                error={passError}
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
                            { passError ? <div className={classes.bigAlert}>Password must have one lowercase, one uppercase, one symbol and be at least 12 characters long.</div> : null }
                        </div>
                    </FormCard>
                </div>
            </div>
    )
} 

export default RegisterPortal
