import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  // TODO: all breakpoints are being forced max width to md but in the future they should have their own
  root: {
    margin: "0 auto",
    width: "calc(100% - 24px)",
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.breakpoints.values.md - 24,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: theme.breakpoints.values.md - 24,
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: theme.breakpoints.values.md - 24,
    },
  },
}));
