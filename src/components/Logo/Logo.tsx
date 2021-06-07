import { Box, Icon, useTheme } from "@material-ui/core";
import React from "react";

import useStyles from "./styles";

export const Logo: React.FC<{ src?: string; icon?: string; expand?: boolean }> = ({ src, icon, expand = false }) => {
  const classes = useStyles();
  const { palette } = useTheme();

  const toRender = src ? <img className={classes.logo} src={src} alt="logo" /> : (
    <Box color={palette.secondary.contrastText} display="flex" alignItems="center">
      <Icon fontSize="large" color={expand ? "inherit" : "primary"}>{icon || "circle"}</Icon>
    </Box>
  );

  return toRender;
};
