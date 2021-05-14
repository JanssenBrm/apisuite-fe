import { makeStyles } from "@apisuite/fe-base";

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    width: "100%",
    height: "100%",
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  rejectButton: {
    backgroundColor: "white",
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.grey[800],
    fontSize: "16px",
    fontWeight: 500,
  },
  textField: {
    backgroundColor: "white",
    borderRadius: theme.shape.borderRadius,
    fontSize: "16px",
    fontWeight: 500,
    "& div > input": {
      color: theme.palette.text.primary + " !important",
    },
  },
  centerContent: {
    alignItems: "center",
    color: theme.palette.grey[400],
    display: "flex",
    flexDirection: "column",
    fontWeight: 300,
    height: "200px",
    justifyContent: "space-evenly",
  },
  loading: {
    color: theme.palette.secondary.main,
  },
  ssoSignIcon: {
    fontSize: "25px",
    left: "20px",
    position: "absolute",
    top: "11.5px",
  },
}));

export default useStyles;
