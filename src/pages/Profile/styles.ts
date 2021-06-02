import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
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
    position: "absolute",
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    width: 20,
    height: 20,
    color: theme.palette.action.active,
    cursor: "pointer",
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
}));
