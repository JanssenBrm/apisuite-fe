import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  apiContractSelector: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.action.active,
    height: 40,
    width: "100%",

    /* Overriding Material UI's styles for the 'Select' component */

    "& > .MuiSelect-select.MuiSelect-select": {
      alignSelf: "flex-end",
      padding: "10px 50px 10px 10px",
    },

    "& > .MuiSelect-select:focus": {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },

    "& > .MuiSelect-icon": {
      color: theme.palette.action.active,
      marginRight: "15px",
    },
  },

  apiFeatureIcon: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    height: 60,
    marginBottom: theme.spacing(2),
    textAlign: "center",
    width: 60,

    "& > svg": {
      color: theme.palette.common.white,
      fontSize: 36,
      transform: "translateY(12px)",
    },
  },

  apiPublicationsContentContainer: {
    margin: theme.spacing(5, "auto", 0, "auto"),
    maxWidth: 915,
    width: "100%",
  },

  appBubbles: {
    textDecoration: "none",

    "& > div": {
      backgroundColor: theme.palette.secondary.light,
      fontSize: 16,
      fontWeight: 300,
      margin: theme.spacing(0, 1.25, 1.25, 0),
    },
  },

  backgroundBanner: {
    marginTop: 175,
    width: "100%",
    zIndex: -1,
  },

  bannerContentContainer: {
    margin: theme.spacing(0, "auto"),
    maxWidth: 915,
    padding: theme.spacing(5, 0),
    width: "100%",
  },

  cardContentContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.3)",
    height: 320,
    textAlign: "center",
    width: 365,
  },

  carouselButton: {
    backgroundColor: theme.palette.secondary.main,
    border: "none",
    color: theme.palette.action.focus,
    height: "40px",
    marginRight: theme.spacing(1.5),
    width: "40px",
  },

  deprecatedChip: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
  },

  docsAccessibleAPIProductBanner: {
    backgroundColor: theme.palette.grey[100],
  },

  docsChip: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.white,
  },

  contentContainer: {
    maxWidth: 915,
    width: "100%",
  },

  highlightIcon: {
    color: theme.palette.info.main,
    fontSize: 60,
  },

  highlightsBackgroundBanner: {
    backgroundColor: theme.palette.secondary.main,
    height: 500,
    width: "100%",

    // Carousel highlight cards
    "& > :first-child": {
      position: "relative",
      top: "40%",

      "@media (min-width: 1024px)": {
        padding: theme.spacing(0, 25),
      },

      "@media (min-width: 1232px)": {
        padding: theme.spacing(0, 37.5),
      },

      "@media (min-width: 1440px)": {
        padding: theme.spacing(0, 50),
      },

      "@media (min-width: 1648px)": {
        padding: theme.spacing(0, 62.5),
      },

      "@media (min-width: 1856px)": {
        padding: theme.spacing(0, 75),
      },

      "@media (min-width: 2064px)": {
        padding: theme.spacing(0, 90),
      },

      "@media (min-width: 2560px)": {
        padding: theme.spacing(0, 105),
      },
    },

    // Carousel highlight card picker
    "& > :last-child": {
      position: "relative",
      textAlign: "center",
      top: "60%",
    },
  },

  linkToSubsModal: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    fontSize: 16,
    padding: theme.spacing(1.25, 2),
    textDecoration: "none",
  },

  prodAccessibleAPIProductBanner: {
    backgroundColor: theme.palette.primary.light,
  },

  prodChip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },

  liveChip: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },

  selectedTab: {
    borderBottom: "3px solid `blue`",
  },

  subbedAppBubblesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 620,
    width: "100%",
  },

  tabsInnerContainer: {
    "& > button": {
      borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
  },

  tabsOuterContainer: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "none !important",
    color: theme.palette.text.primary,
    marginTop: theme.spacing(4),
  },
}));
