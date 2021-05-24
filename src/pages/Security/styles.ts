import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  infoBox: {
    alignItems: "center",
    backgroundColor: theme.palette.info.light,
    borderRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    height: "100%",
    marginBottom: "25px",
    padding: "12px 12px",
    textAlign: "left",
    width: "500px",
  },

  infoBoxIcon: {
    fill: "#46B5EF",
    transform: "translate(-3.5px, -11.5px)",
  },

  infoBoxText: {
    color: "#035E86",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    margin: "0px 0px 5px 2.5px",
  },

  userActivityTitle: {
    color: theme.palette.label,
    fontSize: "22px",
    fontWeight: 300,
  },
}));
