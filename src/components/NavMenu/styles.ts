import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  menuItem: {
    ...theme.typography.body1,
    "& a": {
      textDecoration: "none",
    },
    "& a:link, & a:visited, & a:hover, & a:active": {
      color: "inherit",
    },
    paddingBottom: 10,
    paddingLeft: 10,
    borderStyle: "solid",
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: theme.palette.grey[500],
  },
  selected: {
    color: theme.palette.text.secondary,
    borderColor: theme.palette.primary.main,
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
}));
