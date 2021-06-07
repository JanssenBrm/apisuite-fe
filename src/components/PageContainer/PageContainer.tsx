import React from "react";
import clsx from "clsx";

import { Box } from "@material-ui/core";

import useStyles from "./styles";
import { BoxProps } from "./types";

export const PageContainer: React.FC<BoxProps> = ({
  className,
  disablePaddingY=false,
  ...rest
}) => {
  const classes = useStyles();
  return <Box
    pt={disablePaddingY ? 0 : 30}
    pb={disablePaddingY ? 0 : 7.5}
    className={clsx(classes.root, className)}
    {...rest}
  />;
};
