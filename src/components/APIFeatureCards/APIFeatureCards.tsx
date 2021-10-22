import React from "react";
import { Box, Grid, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import ViewCarouselRoundedIcon from "@material-ui/icons/ViewCarouselRounded";

import useStyles from "./styles";

export const APIFeatureCards: React.FC = () => {
  const classes = useStyles();
  const { palette, shape } = useTheme();

  const [t] = useTranslation();

  const apiFeatureCardsGenerator = (
    title: string,
    description: string,
    image?: string,
  ) => {
    return (
      <Grid item md={3}>
        <Box px={3} py={3} style={{ backgroundColor: palette.background.paper, borderRadius: shape.borderRadius }}>
          <Box mb={2} className={classes.apiFeatureIcon}>
            {
              image
                ? <img src={image} />
                : <ViewCarouselRoundedIcon />
            }
          </Box>

          <Box mb={1}>
            <Typography display="block" style={{ color: palette.primary.main, fontWeight: 700 }} variant="body1">
              {title}
            </Typography>
          </Box>

          <Box>
            <Typography display="block" style={{ color: palette.text.secondary }} variant="body2">
              {description}
            </Typography>
          </Box>
        </Box>
      </Grid>
    );
  };

  // TODO: Temporary placeholders until UI & API are reworked to support this section's cards.
  const apiFeatureCardsContent = [
    apiFeatureCardsGenerator("API Feature A", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature B", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature C", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature D", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature E", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature F", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature G", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
  ];

  return apiFeatureCardsContent.length
    ? (
      <Box className={classes.contentContainer} mx='auto' my={0} pb={9.25}>
        <Box mb={3}>
          <Typography display="block" style={{ color: palette.text.primary }} variant="h4">
            {t("apiProductDetails.apiFeaturesTitle")}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {apiFeatureCardsContent}
        </Grid>
      </Box>
    )
    : null;
};
