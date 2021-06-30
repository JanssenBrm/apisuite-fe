import React from "react";
import { useConfig, useTranslation, useTheme, Grid, Box, Typography } from "@apisuite/fe-base";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

import { PageContainer } from "components/PageContainer";
import NavMenu from "components/NavMenu";

import useStyles from "./styles";

SyntaxHighlighter.registerLanguage("bash", bash);

const Instructions: React.FC = () => {
  const { palette } = useTheme();
  const { infra } = useConfig();
  const classes = useStyles();

  const [t] = useTranslation();

  const steps = [
    {
      stepTitle: t("dashboardTab.testSubTab.instructions.stepOne.stepTitle"),
      stepText: t("dashboardTab.testSubTab.instructions.stepOne.stepText"),
      stepNote: t("dashboardTab.testSubTab.instructions.stepOne.stepNote"),
      command: `curl -X POST \\
-H "Host: ${infra.hydra}" \\
-H "Content-Type: application/x-www-form-urlencoded" \\
-u "{ClientID}:{ClientSecret}" \\
--data-urlencode "grant_type=client_credentials" \\
--data-urlencode "" \\
https://${infra.hydra}/oauth2/token`,
    },
    {
      stepTitle: t("dashboardTab.testSubTab.instructions.stepTwo.stepTitle"),
      stepText: t("dashboardTab.testSubTab.instructions.stepTwo.stepText"),
      stepNote: t("dashboardTab.testSubTab.instructions.stepOne.stepNote"),
      command: `curl -X POST \\
-H "Accept: application/json" \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer {TOKEN}" \\
-d '{"name": "Jack Daniels", "desc": "My cat", "tag": "cat"}' \\
https://${infra.remoteAPI}/v1/pets`,
    },
    {
      stepTitle: t("dashboardTab.testSubTab.instructions.stepThree.stepTitle"),
      stepText: t("dashboardTab.testSubTab.instructions.stepThree.stepText"),
      stepNote: t("dashboardTab.testSubTab.instructions.stepThree.stepNote"),
      response: t("dashboardTab.testSubTab.instructions.stepThree.response"),
      responseCode: t("dashboardTab.testSubTab.instructions.stepThree.responseCode"),
      command: `curl -X GET \\
-H "Authorization: Bearer {TOKEN}" \\
https://${infra.remoteAPI}/v1/pets`,
    },
  ];

  const codeStyle = {
    "hljs-string": {
      color: palette.primary.main,
    },

    "hljs-symbol": {
      color: palette.primary.main,
    },

    "hljs-bullet": {
      color: palette.primary.main,
    },

    "hljs-addition": {
      color: palette.primary.main,
    },

    hljs: {
      background: palette.text.primary,
      color: "#D8D8D8",
      display: "block",
      fontFamily: "Roboto, sans-serif",
      fontSize: 14,
      marginTop: 0,
      overflowX: "auto",
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 0,
    },

    "hljs-emphasis": {
      fontStyle: "italic",
    },

    "hljs-strong": {
      fontWeight: "bold",
    },
  };

  return (
    <PageContainer>
      <Grid container>
        <Grid item md={8}>
          <Box mb={5}>
            <Typography variant="h2">
              {t("dashboardTab.testSubTab.title")}
            </Typography>

            <Typography variant="body1" color="textSecondary">
              {t("dashboardTab.testSubTab.description")}
            </Typography>
          </Box>

          {steps.map((step, index) => (
            <Box key={step.stepTitle} mb={5}>
              <Typography
                id={`step-${index + 1}`}
                variant="h3"
              >
                {t("dashboardTab.testSubTab.stepIntro")} {index + 1}: {step.stepTitle}
              </Typography>

              <Box mt={1.5} mb={3}>
                <Typography variant="body1">
                  {step.stepText}
                </Typography>
              </Box>

              {step.stepNote.length > 0 && (
                <div className={classes.noteContainer}>
                  <div className={classes.noteContent}>
                    <Typography variant="body1">Note</Typography>
                    <Typography variant="body2" style={{ color: palette.primary.contrastText }}>
                      {step.stepNote}
                    </Typography>
                  </div>
                </div>
              )}

              <div className={classes.iconRow}>
                <FileCopyOutlinedIcon
                  className={classes.clipboardIcon}
                  onClick={() => { navigator.clipboard.writeText(step.command); }}
                />
              </div>

              <SyntaxHighlighter
                language='bash'
                style={codeStyle}
                className={classes.codeBlock}
              >
                {step.command}
              </SyntaxHighlighter>

              {step.response && (
                <>
                  <Box clone mb={1.5}>
                    <Typography variant="body1">
                      {step.response}
                    </Typography>
                  </Box>

                  <div className={classes.iconRow}>
                    <FileCopyOutlinedIcon
                      className={classes.clipboardIcon}
                      onClick={() => { navigator.clipboard.writeText(step.responseCode); }}
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
              )}
            </Box>
          ))}

          <Typography variant="h3">
            {t("dashboardTab.testSubTab.finalRemarksPartOne")}
          </Typography>

          <Box mt={1.5} mb={3}>
            <Typography variant="body1">
              {t("dashboardTab.testSubTab.finalRemarksPartTwo")}
            </Typography>
          </Box>
        </Grid>

        <Grid
          component={Box}
          item
          md={4}
          pt={15}
        >
          <div className={classes.sideMenuContainer}>
            <NavMenu
              options={steps.map((step, index) => (
                `${t("dashboardTab.testSubTab.stepIntro")} ${index + 1}: ${step.stepTitle}`
              ))}
            />
          </div>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Instructions;
