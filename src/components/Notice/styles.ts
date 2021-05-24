import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  noticeContentsContainer: {
    backgroundColor: theme.palette.info.light,
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    alignItems: "center",
    padding: 12,
    width: "100%",
  },

  noticeIcon: {
    alignItems: "center",
    color: theme.palette.info.main,
    display: "flex",
    justifyContent: "center",
    marginRight: "10px",
  },
}));
