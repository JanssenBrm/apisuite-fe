import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  // General JSS

  root: {
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    paddingBottom: 45,
    width: "100%",
  },

  section: {
    maxWidth: 900,
    margin: "0 auto",
  },

  sectionSeparator: {
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderRadius: theme.shape.borderRadius,
    maxWidth: "900px",
    width: "100%",
  },

  // JSS for the 'Slideshow' section

  slideShowSectionContainer: {
    height: "670px",
    marginBottom: "-280px",
    transform: "translateY(-300px)",
  },

  // JSS for the 'Steps' section

  individualStepsContainer: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: "8px",
    display: "flex",
    flexDirection: "row",
  },

  stepsDescriptionSupportButton: {
    marginTop: theme.spacing(4),
  },

  // JSS for the 'API Catalog' section

  apiCatalogContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  noticeContainer: {
    margin: "0px auto -30px auto",
    maxWidth: "900px",
  },

  stepCta: {
    border: "2px solid",
    marginTop: "auto",

    "&:hover": {
      border: "2px solid",
    },

    "&.Mui-disabled":  {
      border: `2px solid ${theme.palette.action.disabledBackground}`,
    },
  },
}));
