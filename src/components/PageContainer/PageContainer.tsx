import React from "react";
import clsx from "clsx";

import useStyles from "./styles";
import { Box, BoxProps } from "@material-ui/core";

export const PageContainer: React.FC<BoxProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  return <Box pt={30} pb={7.5} className={clsx(classes.root, className)} {...rest} />;
};
