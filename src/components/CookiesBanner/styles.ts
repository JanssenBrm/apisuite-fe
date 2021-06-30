import { makeStyles } from "@apisuite/fe-base";

const useStyles = makeStyles((theme) => ({
  cookiesConsentBannerContainer: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    padding: "25px 45px",
  },

  cookiesConsentButton: {
    backgroundColor: `${theme.palette.background.default} !important`,
    borderRadius: `${theme.shape.borderRadius}px !important`,
    color: `${theme.palette.primary.main} !important`,
    padding: "12px 20px !important",
    fontSize: "16px !important",
    fontWeight: 600,
  },

  cookiesConsentHeader: {
    ...theme.typography.h3,
    color: theme.palette.primary.contrastText,
    margin: "0px 80px 12px 0px",
  },

  cookiesConsentParagraph: {
    ...theme.typography.body1,
    color: theme.palette.primary.contrastText,
    marginRight: "80px",

    "&:first-of-type": {
      marginBottom: "20px",
    },
  },
}));

export default useStyles;
