import * as React from 'react'
import useStyles, { codeStyle } from './styles'
import SyntaxHighlighter from 'react-syntax-highlighter'

const Instructions: React.FC<{}> = () => {
  const classes = useStyles()
  const steps = [
    {
      stepTitle: 'Get the App\'s token',
      instruction: 'Instruction 1',
      info: '',
      note: 'this is a note',
      command: `curl -X POST \\
    -H "Host: hydraauth-dev.apisuite.cloudoki.com" \\
    -H "Content-Type: application/x-www-form-urlencoded" \\
    -u "{ClientID}:{ClientSecret}" \\
    --data-urlencode "grant_type=client_credentials" \\
    --data-urlencode "scope=sandbox" \\
    https://hydraauth-dev.apisuite.cloudoki.com/oauth2/token`,
    },
    {
      stepTitle: 'Upload your swagger file',
      instruction: '',
      info: '',
      note: '',
      command: `curl -X POST \\
    -H "Host: sandbox-dev.apisuite.cloudoki.com" \\
    -H "Content-Type: multipart/form-data" \\
    -H "Authorization: Bearer {TOKEN}" \\
    -F "file=@swagger-v3.json" \\
    https://sandbox-dev.apisuite.cloudoki.com/upload`,
    },
    {
      stepTitle: 'Upload data to your Sandbox',
      instruction: '',
      info: '',
      note: '',
      command: `url -X POST \\
    -H "Accept: application/json" \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer {TOKEN}" \\
    -H "Host: sandbox-dev.apisuite.cloudoki.com" \\
    -d '{"name":"Jack Daniels","desc":"My cat","tag":"cat"}' \\
    https://sandbox-dev.apisuite.cloudoki.com/v3/pets`,
    },
    {
      stepTitle: 'Getting data from the Sandbox',
      instruction: '',
      info: '',
      note: 'this is a note',
      command: `curl -X GET \\
    -H "Authorization: Bearer {TOKEN}" \\
    -H "Host: sandbox-dev.apisuite.cloudoki.com" \\
    https://sandbox-dev.apisuite.cloudoki.com/v3/pets`,
    },
  ]

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>How to use and test your Sandbox</h1>
        <div className={classes.mainContainer}>
          <div className={classes.content}>
            {steps.map((step, indx) => (
              <>
                <h2 className={classes.stepTitle}>Step {indx + 1}: {step.stepTitle}</h2>
                <p className={classes.description}>
                  {step.instruction}
                </p>

                {step.note.length > 0 &&
                  <div className={classes.noteContainer}>
                    <div className={classes.noteContent}>
                      <div className={classes.noteTitle}>Tip</div>
                      <div className={classes.note}>{step.note}</div>
                    </div>
                  </div>}

                <SyntaxHighlighter
                  language='bash'
                  style={codeStyle}
                  className={classes.codeBlock}
                >
                  {step.command}
                </SyntaxHighlighter>
              </>
            ))}

            <h2 className={classes.stepTitle}>Congratulations!</h2>

            <p className={classes.description}>
                Now you know how to do it. That's how easy it is to get your Sandbox running!
            </p>
          </div>

          <div className={classes.navigation}>
            side
          </div>

        </div>
      </section>
    </div>
  )
}

export default Instructions
