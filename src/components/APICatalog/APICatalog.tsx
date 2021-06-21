import React from "react";
import { useHistory } from "react-router";
import { Avatar, Box, Grid, Paper, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import { Tag } from "components/Tag";
import useStyles from "./styles";
import { APICatalogProps, APIDetails } from "./types";

import { testIds } from "testIds";

const APICatalog: React.FC<APICatalogProps> = ({ apisToDisplay }) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();

  const handleOnCardClick = (details: APIDetails) => () => {
    history.push(`/api-products/details/${details.id}/spec/${details.apiRoutingId}`);
  };

  return (
    <Grid
      component={Box}
      container
      xs
      spacing={3}
      display="flex"
      justifyContent="start"
    >
      {apisToDisplay.map((apiDetails) => {
        if (!apiDetails) return null;

        const tagColor = apiDetails.apiAccess ? palette.primary.main : palette.secondary.light;

        return (
          <Grid
            key={apiDetails.id}
            component={Box}
            clone
            xs={5}
            container
            p={3}
            m={1.5}
            height={200}
            onClick={handleOnCardClick(apiDetails)}
            data-test-id={testIds.apiCatalogCard}
          >
            <Paper variant="outlined">
              <Grid item xs={2} data-test-id={testIds.apiCardAvatar}>
                <Avatar
                  classes={{
                    colorDefault: apiDetails.apiAccess
                      ? classes.colorsOfProductionAPI : classes.colorsOfAPIDocumentation,
                  }}
                >
                  {apiDetails.apiName.slice(0, 2)}
                </Avatar>
              </Grid>

              <Grid
                component={Box}
                item
                xs={10}
                pt={1}
                pl={2}
              >
                <Typography variant="h5" gutterBottom data-test-id={testIds.apiCardName}>
                  {apiDetails.apiName}
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  <Tag v={apiDetails.apiVersion} color={tagColor}/>
                  {
                    apiDetails.apiAccess
                      ? <span data-test-id={testIds.apiCardAccessType}>{t("sandboxPage.apiCatalog.productionAccess")}</span>
                      : <span data-test-id={testIds.apiCardAccessType}>{t("sandboxPage.apiCatalog.documentationAccess")}</span>
                  }
                </Typography>

                <Box
                  maxHeight={50}
                  overflow="hidden"
                  clone
                >
                  <Typography variant="subtitle1" data-test-id={testIds.apiCardDescription}>
                    {apiDetails.apiDescription}
                  </Typography>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default APICatalog;
