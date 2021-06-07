import React from "react";
import { Button } from "@apisuite/fe-base";

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
    <section className={classes.greetingCardContentsContainer}>
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
        className={classes.greetingCardButton}
        href={greetingCardButtonLink}
        variant="contained"
        disableElevation
        color="secondary"
        size="large"
        data-test-id={testIds.greetingCardButton}
      >
        {greetingCardButtonLabel}
      </Button>
    </section>
  );
};

export default GreetingCard;
