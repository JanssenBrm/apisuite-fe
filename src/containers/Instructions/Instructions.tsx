import * as React from 'react'

import { useTranslation } from 'react-i18next'

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash'

import NavMenu from 'components/NavMenu'

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'

import useStyles, { codeStyle } from './styles'

import { config } from 'constants/global'

SyntaxHighlighter.registerLanguage('bash', bash)

const Instructions: React.FC<{}> = () => {
  const classes = useStyles()

  const [t] = useTranslation()

  const steps = [
    {
      stepTitle: t('dashboardTab.testSubTab.instructions.stepOne.stepTitle', { config }),
      stepText: t('dashboardTab.testSubTab.instructions.stepOne.stepText', { config }),
      stepNote: t('dashboardTab.testSubTab.instructions.stepOne.stepNote', { config }),
      command: `curl -X POST \\
-H "Host: ${config.infra.hydra}" \\
-H "Content-Type: application/x-www-form-urlencoded" \\
-u "{ClientID}:{ClientSecret}" \\
--data-urlencode "grant_type=client_credentials" \\
--data-urlencode "" \\
https://${config.infra.hydra}/oauth2/token`,
    },
    {
      stepTitle: t('dashboardTab.testSubTab.instructions.stepTwo.stepTitle', { config }),
      stepText: t('dashboardTab.testSubTab.instructions.stepTwo.stepText', { config }),
      stepNote: t('dashboardTab.testSubTab.instructions.stepOne.stepNote', { config }),
      command: `curl -X POST \\
-H "Accept: application/json" \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer {TOKEN}" \\
-d '{"name": "Jack Daniels", "desc": "My cat", "tag": "cat"}' \\
https://${config.infra.remoteAPI}/v1/pets`,
    },
    {
      stepTitle: t('dashboardTab.testSubTab.instructions.stepThree.stepTitle', { config }),
      stepText: t('dashboardTab.testSubTab.instructions.stepThree.stepText', { config }),
      stepNote: t('dashboardTab.testSubTab.instructions.stepThree.stepNote', { config }),
      response: t('dashboardTab.testSubTab.instructions.stepThree.response', { config }),
      responseCode: t('dashboardTab.testSubTab.instructions.stepThree.responseCode', { config }),
      command: `curl -X GET \\
-H "Authorization: Bearer {TOKEN}" \\
https://${config.infra.remoteAPI}/v1/pets`,
    },
  ]

  return (
    <div className={`page-container ${classes.root}`}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t('dashboardTab.testSubTab.title', { config })}</h1>

        <div className={classes.mainContainer}>
          <div className={classes.content}>
            <p className={classes.description}>
              {t('dashboardTab.testSubTab.description', { config })}
            </p>

            {
              steps.map((step, index) => (
                <div key={index} className={classes.stepContainer}>
                  <h2
                    id={`step-${index + 1}`}
                    className={classes.stepTitle}
                  >
                    {t('dashboardTab.testSubTab.stepIntro', { config })} {index + 1}: {step.stepTitle}
                  </h2>

                  <p className={classes.description}>
                    {step.stepText}
                  </p>

                  {
                    step.stepNote.length > 0 &&
                    <div className={classes.noteContainer}>
                      <div className={classes.noteContent}>
                        <div className={classes.noteTitle}>Note</div>
                        <div className={classes.note}>{step.stepNote}</div>
                      </div>
                    </div>
                  }

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

                  {
                    step.response &&
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
                    </>
                  }
                </div>
              ))
            }

            <h2 className={classes.stepTitle}>
              {t('dashboardTab.testSubTab.finalRemarksPartOne', { config })}
            </h2>

            <p className={classes.description}>
              {t('dashboardTab.testSubTab.finalRemarksPartTwo', { config })}
            </p>
          </div>

          <div className={classes.navigation}>
            <div className={classes.sideMenuContainer}>
              <NavMenu
                options={steps.map((step, index) => (
                  `${t('dashboardTab.testSubTab.stepIntro', { config })} ${index + 1}: ${step.stepTitle}`
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
