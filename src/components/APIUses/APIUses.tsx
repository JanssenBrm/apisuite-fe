import React from "react";
import { Box, Grid, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import ViewCarouselRoundedIcon from "@material-ui/icons/ViewCarouselRounded";

import useStyles from "./styles";

export const APIUses: React.FC = () => {
  const classes = useStyles();
  const { palette } = useTheme();

  const [t] = useTranslation();

  const useAPICardGenerator = (
    title: string,
    description: string,
    image?: string,
  ) => {
    return (
      <Grid item md={6}>
        <Box mb={2}>
          {
            image
              ? <img src={image} />
              : <ViewCarouselRoundedIcon className={classes.highlightIcon} />
          }
        </Box>

        <Box mb={3}>
          <Typography display="block" style={{ color: palette.primary.main }} variant="h6">
            {title}
          </Typography>
        </Box>

        <Box>
          <Typography display="block" style={{ color: palette.text.primary }} variant="body1">
            {description}
          </Typography>
        </Box>
      </Grid>
    );
  };

  // TODO: Temporary placeholders until UI & API are reworked to support this section's cards.
  const useAPICardsContent = [
    useAPICardGenerator("Give insights", "We want to help you to create value-added services and applications. Therefore we give our customers the possibility to give access to their account information if so desired. Combining this data with other valuable data sources puts you in a unique position to give meaningful financial insights to our customers."),
    useAPICardGenerator("Advise", "Giving our customers the possibility to give access to their account information will allow you to go beyond mere insights and give added value advice around spending and earnings decisions in accordance with our customers’ lifestyles."),
    useAPICardGenerator("Do something else entirely", "A human being is a part of the whole that we call 'Universe', a part limited in time and space. He experiences himself, his thoughts and feeling as something separated from the rest, a kind of optical delusion of his consciousness. This delusion is a kind of prison for us, restricting us to our personal desires and to affection for a few persons nearest to us. Our task must be to free ourselves from this prison by widening our circle of compassion to embrace all living creatures and the whole of nature in its beauty."),
  ];

  return useAPICardsContent.length
    ? (
      <Box className={classes.contentContainer} mx='auto' my={7.5}>
        <Box mb={3}>
          <Typography display="block" style={{ color: palette.text.primary }} variant="h4">
            {t("apiProductDetails.useThisAPITitle")}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {useAPICardsContent}
        </Grid>
      </Box>
    )
    : null;
};
