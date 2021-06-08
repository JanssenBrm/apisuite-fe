import React from "react";
import { useSelector } from "react-redux";
import { Box, Icon, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";

import { apisByNameSelector } from "pages/Subscriptions/selectors";
import { AppInfo } from "store/subscriptions/types";
import Link from "components/Link";

import useStyles from "./styles";

export const SubscriptionsTable: React.FC = () => {
  const classes = useStyles();
  const { shape, palette } = useTheme();
  const { t } = useTranslation();
  const apisByName = useSelector(apisByNameSelector);

  const generateAppIcons = (appNamesArray: AppInfo[]) => {
    const sortedAppNamesArray = appNamesArray.sort();

    const appIconsArray = sortedAppNamesArray.map((appName, key) => {
      const appSplitName = appName.appName.split(" ");
      const appInitials = appSplitName.length >= 2
        ? `${appSplitName[0].charAt(0)}${appSplitName[1].charAt(0)}`
        : appSplitName[0].slice(0, 2);

      return (
        <Box
          key={`${appName}${key}`}
          borderRadius={shape.borderRadius}
          style={{ backgroundColor: palette.primary.main, color: palette.primary.contrastText }}
          ml={1.5}
          width={35}
          textAlign="center"
        >
          <Typography variant="body2" color="inherit">{appInitials}</Typography>
        </Box>
      );
    });

    return appIconsArray;
  };

  const generateTableEntries = () => {
    const tableEntriesArray = apisByName.map((api, index) => {
      return (
        // Will contain a particular API's details (its name, subscribed apps, and versions)
        <div key={`apiDetailsContainer${index}`}>
          {/* API's name and subscribed apps */}
          <div className={classes.apiNameAndAppsContainer}>
            <div className={classes.apiNameContainer}>
              <Typography variant="body1">{api.name}</Typography>
            </div>

            <div className={classes.apiAppsContainer}>
              {
                api.apps
                  ? (
                    generateAppIcons(api.apps)
                  )
                  : (
                    <Typography variant="subtitle1">Subscribe applications...</Typography>
                  )
              }
            </div>

            <div className={classes.apiDetailsLinkContainer}>
              {!!api.versions.length && (
                <Link to={`/api-products/details/${api.versions[0].apiId}/spec/${api.versions[0].id}`}>
                  <Icon>menu_open</Icon>
                </Link>
              )}

              {!api.versions.length && (
                <Icon color="disabled">menu_open</Icon>
              )}
            </div>
          </div>

          {/* API's versions */}
          {api.versions.map((apiVersion, index) => {
            return (
              <Link
                className={classes.apiVersionLink}
                key={`${apiVersion.title}${index}`}
                to={`/api-products/details/${apiVersion.apiId}/spec/${apiVersion.id}`}
              >
                <div className={classes.apiVersionDetailsContainer}>
                  <Typography variant="body1">{apiVersion.version}</Typography>

                  <Typography variant="body1">{apiVersion.title}</Typography>

                  <div className={classes.apiVersionIconsContainer}>
                    {
                      apiVersion.deprecated
                        ? <ReportProblemOutlinedIcon className={classes.deprecatedIcon} />
                        : null
                    }

                    <Icon>chevron_right</Icon>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    });

    return tableEntriesArray;
  };

  return (
    <div className={classes.tableContentsContainer}>
      <div className={classes.tableHeader}>
        <Typography variant="body1">
          <b>{t("dashboardTab.subscriptionsSubTab.hasDataToShow.subscriptionsTable.title")}</b>
        </Typography>

        <Typography variant="body1">
          <b>{t("dashboardTab.subscriptionsSubTab.hasDataToShow.subscriptionsTable.subtitle")}</b>
        </Typography>
      </div>

      <div className={classes.tableBody}>
        {generateTableEntries()}
      </div>
    </div>
  );
};
