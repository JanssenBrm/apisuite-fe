import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  allUserDetailsContainer: {
    display: "flex",
    margin: "0px auto 50px auto",
    maxWidth: "900px",
    width: "100%",
  },

  avatar: {
    background: theme.palette.gradient.light,
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: 300,
    height: "120px",
    margin: "24px 100px",
    width: "120px",
  },

  avatarIcons: {
    color: theme.palette.action.active,
    cursor: "pointer",
    height: "20px",
    position: "absolute",
    transform: "translate(130px, -10px)",
    width: "20px",
  },
  createOrganisationButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.primary.contrastText} !important`,
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
    padding: "12px 20px",
    textDecoration: "none",
  },

  disabledUpdateDetailsButton: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    color: `${theme.palette.primary.contrastText} !important`,
    cursor: "none",
    fontSize: "16px",
    fontWeight: 500,
    height: "40px",
    margin: "10px auto",
    maxWidth: "270px",
    opacity: 0.5,
    padding: "12px 20px",
    pointerEvents: "none",
    textDecoration: "none",
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  enabledUpdateDetailsButton: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    color: `${theme.palette.primary.contrastText} !important`,
    cursor: "none",
    fontSize: "16px",
    fontWeight: 500,
    height: "40px",
    margin: "10px auto",
    maxWidth: "270px",
    padding: "12px 20px",
    textDecoration: "none",
    width: "100%",

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  formFieldsContainer: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: "35px",
    textAlign: "center",
  },

  formSectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    margin: "0px 0px 20px 0px",
    maxWidth: "320px",
    width: "100%",
  },

  infoBox: {
    alignItems: "center",
    backgroundColor: theme.palette.info.light,
    borderRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    height: "100%",
    padding: "12px 12px",
    textAlign: "left",
    width: "400px",
  },

  infoBoxIcon: {
    fill: "#46B5EF",
    transform: "translate(-3.5px, -23.5px)",
  },

  infoBoxText: {
    color: "#035E86",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    margin: "0px 0px 5px 2.5px",
  },

  leftSideDetailsContainer: {
    marginRight: "80px",
    maxWidth: "500px",
    width: "100%",
  },

  openIDInfoBoxContainer: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "0px auto",
    maxWidth: "900px",
    width: "100%",
  },

  otherActionsContainerTwo: {
    display: "flex",
    justifyContent: "flex-end",
  },

  rightSideDetailsContainer: {
    maxWidth: "320px",
    width: "100%",
  },

  signOutButton: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    color: `${theme.palette.action.active} !important`,
    fontSize: "16px",
    fontWeight: 500,
    marginLeft: "15px",
    padding: "12px 20px",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },

  userDetailsContainer: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.label}`,
    borderRadius: theme.shape.borderRadius,
  },

  userNameAndRoleContainer: {
    alignItems: "center",
    display: "flex",
    height: "32.5px",
    marginBottom: "12px",
  },

  userRole: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    fontWeight: 300,
    padding: "2px 7.5px",
    marginLeft: theme.spacing(1),
  },

  userStatusAndType: {
    alignItems: "center",
    display: "flex",
    margin: "20px 25px",

    "& > :first-child": {
      color: theme.palette.primary.main,
      fontSize: "14px",
      marginRight: "12px",
    },
  },

  spaceHorizontal: {
    padding: "0 12px",
  },
}));
