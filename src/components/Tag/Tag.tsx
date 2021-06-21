import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";

import { testIds } from "testIds";

export const Tag: React.FC<{ v: string; color?: string }> = ({ v, color }) => {
  const { shape, palette } = useTheme();

  return (
    <Box
      clone
      px={1.5}
      py={0.5}
      borderRadius={shape.borderRadius}
      color={palette.common.white}
      style={{ backgroundColor: color || palette.grey[500] }}
      width="max-content"
    >
      <Typography component="span" variant="subtitle1" color="inherit" data-test-id={testIds.apiCardVersion}>
        {v}
      </Typography>
    </Box>
  );
};
