import React, { useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { Box, Typography, useTheme } from "@apisuite/fe-base";
import RadioButtonCheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import ViewCarouselRoundedIcon from "@material-ui/icons/ViewCarouselRounded";

import useStyles from "./styles";

export const APIHighlights: React.FC = () => {
  const classes = useStyles();
  const { palette } = useTheme();

  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselCardGenerator = (
    title: string,
    description: string,
    image?: string,
  ) => {
    return (
      <Box className={classes.cardContentContainer} px={3} py={5}>
        <Box mb={4}>
          {
            image
              ? <img src={image} />
              : <ViewCarouselRoundedIcon className={classes.highlightIcon} />
          }
        </Box>

        <Box mb={2}>
          <Typography display="block" style={{ color: palette.primary.main }} variant="h6">
            {title}
          </Typography>
        </Box>

        <Box>
          <Typography display="block" style={{ color: palette.text.primary }} variant="body1">
            {description}
          </Typography>
        </Box>
      </Box>
    );
  };

  // TODO: Temporary placeholders until UI & API are reworked to support carousel highlight cards.
  const carouselHighlights = [
    {
      key: "1",
      content: carouselCardGenerator("Highlight title A", "API Product highlight card, composed by a title, description, and optional image."),
    },
    {
      key: "2",
      content: carouselCardGenerator("Highlight title B", "API Product highlight card, composed by a title, description, and optional image."),
    },
    {
      key: "3",
      content: carouselCardGenerator("Highlight title C", "API Product highlight card, composed by a title, description, and optional image."),
    },
  ];

  return carouselHighlights.length
    ? (
      <Box className={classes.highlightsBackgroundBanner}>
        <Box mb={8}>
          <Carousel
            showNavigation
            slides={carouselHighlights}
            goToSlide={currentSlide}
          />
        </Box>

        {/* TODO: Temporary placeholders until UI & API are reworked to support carousel highlight cards. */}
        <Box>
          {
            carouselHighlights.map((_highlight, index) => {
              return (
                <button
                  className={classes.carouselButton}
                  key={`carouselButton${index}`}
                  onClick={() => setCurrentSlide(index)}
                >
                  {
                    currentSlide === index ? <RadioButtonCheckedRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />
                  }
                </button>
              );
            })
          }
        </Box>
      </Box>
    )
    : null;
};
