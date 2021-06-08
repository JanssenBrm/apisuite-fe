import { makeStyles } from "@apisuite/fe-base";

const useStyles = makeStyles((theme) => ({
  notificationBannerCloseButton: {
    color: theme.palette.primary.contrastText,
    cursor: "pointer",
    height: "24px",
    width: "24px",
  },

  notificationBannerContentsContainer: {
    backgroundColor: theme.palette.primary.main,
    bottom: 0,
    display: "flex",
    padding: "25px 60px 45px 60px",
    position: "sticky",
  },

  notificationBannerHeader: {
    color: theme.palette.primary.contrastText,
  },

  notificationBannerParagraph: {
    color: theme.palette.primary.contrastText,
  },

  notificationBannerTextContainer: {
    width: "100%",
  },
}));

export default useStyles;
