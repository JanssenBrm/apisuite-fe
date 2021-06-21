import React from "react";

import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Box, Typography } from "@apisuite/fe-base";

import useStyles from "./styles";

import { NotificationBannerProps } from "./types";

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  customNotificationBannerContents,
  notificationBannerText,
  notificationBannerTitle,
  showNotificationBanner,
}) => {
  const classes = useStyles();

  const [showing, setShowing] = React.useState(showNotificationBanner || false);

  const handleClose = () => {
    setShowing(false);
  };

  return (
    showing
      ? (
        <section className={classes.notificationBannerContentsContainer}>
          <div className={classes.notificationBannerTextContainer}>
            <Box pb={1}>
              <Typography variant="h3" className={classes.notificationBannerHeader}>
                {notificationBannerTitle}
              </Typography>
            </Box>

            {
              customNotificationBannerContents || (
                <Box mr={2}>
                  <Typography variant="body1" className={classes.notificationBannerParagraph}>
                    {notificationBannerText}
                  </Typography>
                </Box>
              )
            }
          </div>

          <div>
            <CloseRoundedIcon
              className={classes.notificationBannerCloseButton}
              onClick={handleClose}
            />
          </div>
        </section>
      )
      : null
  );
};

export default NotificationBanner;
