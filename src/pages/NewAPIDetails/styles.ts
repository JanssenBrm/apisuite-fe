import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  backgroundBanner: {
    marginTop: 200,
    width: "100%",
    zIndex: -1,
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

  bannerContentContainer: {
    margin: theme.spacing(0, "auto"),
    maxWidth: 915,
    padding: theme.spacing(5, 0),
    width: "100%",
  },

  draftAPIProductBanner: {
    backgroundColor: theme.palette.warning.light,
  },

  draftChip: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
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

  contentContainer: {
    maxWidth: 915,
    width: "100%",
  },

  subbedAppBubblesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 620,
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

  linkToSubsModal: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    fontSize: 16,
    padding: theme.spacing(1.25, 2),
    textDecoration: "none",
  },

  apiPublicationsContentContainer: {
    margin: theme.spacing(5, "auto", 0, "auto"),
    maxWidth: 915,
    width: "100%",
  },

  apiContractSelector: {
    color: theme.palette.action.active,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    height: 40,
    width: "100%",

    /* Overriding Material UI's styles for the 'Select' component */

    "& > .MuiSelect-select.MuiSelect-select": {
      alignSelf: "flex-end",
      padding: "10px 50px 10px 10px",
    },

    "& > .MuiSelect-icon": {
      color: theme.palette.action.active,
      marginRight: "15px",
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

  tabsInnerContainer: {
    "& > button": {
      borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
  },

  selectedTab: {
    borderBottom: "3px solid `blue`",
  },

  cardContentContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.3)",
    height: 320,
    textAlign: "center",
    width: 365,
  },

  highlightIcon: {
    color: theme.palette.info.main,
    fontSize: 60,
  },

  carouselButton: {
    backgroundColor: theme.palette.secondary.main,
    border: "none",
    color: theme.palette.action.focus,
    height: "40px",
    marginRight: theme.spacing(1.5),
    width: "40px",
  },
}));
