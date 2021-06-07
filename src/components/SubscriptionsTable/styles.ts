import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  apiAppsContainer: {
    alignItems: "center",
    borderLeft: `1px solid ${theme.palette.grey[200]}`,
    display: "flex",
    width: "405px",
  },

  apiDetailsLinkContainer: {
    alignItems: "center",
    borderLeft: `1px solid ${theme.palette.grey[200]}`,
    display: "flex",
    justifyContent: "center",
    width: "40px",
  },

  apiNameAndAppsContainer: {
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    display: "flex",
    height: "40px",
    justifyContent: "space-between",
    width: "100%",
  },

  apiNameContainer: {
    alignItems: "center",
    display: "flex",
    width: "455px",
    paddingLeft: 40,
  },

  apiVersionDetailsContainer: {
    alignItems: "center",
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    display: "flex",
    height: "35px",
    justifyContent: "space-between",
    padding: "0px 7.5px 00px 40px",
  },

  apiVersionIconsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "300px",
  },

  apiVersionLink: {
    textDecoration: "none",
  },

  deprecatedIcon: {
    backgroundColor: theme.palette.warning.main,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    marginRight: "20px",
    padding: "5px",
  },

  noSubsMessage: {
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 300,
    padding: "10px 0px 10px 12px",
  },

  tableBody: {
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderBottomLeftRadius: `${theme.shape.borderRadius}px`,
    borderBottomRightRadius: `${theme.shape.borderRadius}px`,
    borderTop: "none",
    width: "100%",
  },

  tableContentsContainer: {
    width: "900px",
  },

  tableHeader: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderTopLeftRadius: `${theme.shape.borderRadius}px`,
    borderTopRightRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 47.5px 10px 40px",
    width: "100%",

    "& > :first-child": {
      color: theme.palette.action.active,
      fontSize: "16px",
      fontWeight: 300,
    },

    "& > :last-child": {
      color: theme.palette.text.primary,
      fontSize: "16px",
      fontWeight: 300,
    },
  },
}));
