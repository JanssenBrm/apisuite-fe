import * as React from 'react'
import useStyles, { codeStyle } from './styles'
import SyntaxHighlighter from 'react-syntax-highlighter'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import NavMenu from 'components/NavMenu'

const Instructions: React.FC<{}> = () => {
  const classes = useStyles()
  const steps = [
    {
      stepTitle: 'Get the App\'s token',
      instruction: 'We begin by retrieving a unique token id. We will use this token in the following requests so that API Suite can verify your identity.',
      note: '',
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
      instruction: 'Now make a POST request to upload your Swagger file to API Suite so we can customize your Sandbox. This step will take a few minutes.',
      note: 'Your Swagger file is a YAML or JSON that contains a complete structure of your API. It can be generated manually or automatically. Got to https://swagger.io/tools/open-source/getting-started/ to learn more.',
      command: `curl -X POST \\
    -H "Host: sandbox-dev.apisuite.cloudoki.com" \\
    -H "Content-Type: multipart/form-data" \\
    -H "Authorization: Bearer {TOKEN}" \\
    -F "file=@swagger-v3.json" \\
    https://sandbox-dev.apisuite.cloudoki.com/upload`,
    },
    {
      stepTitle: 'Upload data to your Sandbox',
      instruction: 'Your Sandbox is up and running! We can upload data to the Sanbox by making another post request with a JSON.',
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
      instruction: 'Everything is setup. Let\'s test the Sandbox using a simplet GET request.',
      response: 'The response should look like this: ',
      responseCode: '[{\n  "desc":"My cat",\n  "name":"Jack Daniels",\n  "tag":"cat",\n  "id":11582904187752\n}]',
      note: '',
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
            <p className={classes.description}>
              We are going to make a series of cURL requests to the API Suite so we can setup and test a Sandbox.
            </p>
            {steps.map((step, indx) => (
              <div key={indx} className={classes.stepContainer}>
                <h2
                  id={`step-${indx + 1}`}
                  className={classes.stepTitle}
                >
                   Step {indx + 1}: {step.stepTitle}
                </h2>
                <p className={classes.description}>
                  {step.instruction}
                </p>

                {step.note.length > 0 &&
                  <div className={classes.noteContainer}>
                    <div className={classes.noteContent}>
                      <div className={classes.noteTitle}>Note</div>
                      <div className={classes.note}>{step.note}</div>
                    </div>
                  </div>}

                <div className={classes.iconRow}>
                  <FileCopyOutlinedIcon
                    className={classes.clipboardIcon}
                    onClick={() => { navigator.clipboard.writeText(step.command) }}
                  />
                </div>
                <SyntaxHighlighter
                  language='bash'
                  style={codeStyle}
                  className={classes.codeBlock}
                >
                  {step.command}
                </SyntaxHighlighter>
                {step.response &&
                  <>
                    <p className={classes.description}>
                      {step.response}
                    </p>
                    <div className={classes.iconRow}>
                      <FileCopyOutlinedIcon
                        className={classes.clipboardIcon}
                        onClick={() => { navigator.clipboard.writeText(step.responseCode) }}
                      />
                    </div>
                    <SyntaxHighlighter
                      language='bash'
                      style={codeStyle}
                      className={classes.codeBlock}
                    >
                      {step.responseCode}
                    </SyntaxHighlighter>
                  </>}
              </div>
            ))}

            <h2 className={classes.stepTitle}>Congratulations!</h2>

            <p className={classes.description}>
                Now you know how to do it. That's how easy it is to get your Sandbox up and running!
            </p>
          </div>

          <div className={classes.navigation}>
            <div className={classes.sideMenuContainer}>
              <NavMenu
                options={steps.map((step, indx) => (
                  `Step ${indx + 1}: ${step.stepTitle}`
                ))}
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Instructions
