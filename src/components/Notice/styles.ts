import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  noticeContentsContainer: {
    backgroundColor: theme.palette.info.light,
    borderRadius: `${theme.shape.borderRadius}px`,
    display: "flex",
    padding: 12,
    width: "100%",
    alignItems: "center",
  },

  noticeIcon: {
    color: theme.palette.info.main,
    marginRight: 10,
    alignSelf: "flex-start",
  },
}));
