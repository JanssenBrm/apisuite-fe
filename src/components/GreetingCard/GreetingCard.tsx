import React from "react";
import { Button, Paper } from "@apisuite/fe-base";

import useStyles from "./styles";
import { GreetingCardProps } from "./types";

import { testIds } from "testIds";

const GreetingCard: React.FC<GreetingCardProps> = ({
  greetingCardText,
  greetingCardButtonLabel,
  greetingCardButtonLink,
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      {
        typeof greetingCardText === "string"
          ? (
            <p className={classes.greetingCardText}>
              {greetingCardText}
            </p>
          )
          : greetingCardText
      }

      <Button
        data-test-id={testIds.greetingCardButton}
        className={classes.greetingCardButton}
        href={greetingCardButtonLink}
        variant="contained"
        disableElevation
        color="secondary"
        size="large"
      >
        {greetingCardButtonLabel}
      </Button>
    </Paper>
  );
};

export default GreetingCard;
