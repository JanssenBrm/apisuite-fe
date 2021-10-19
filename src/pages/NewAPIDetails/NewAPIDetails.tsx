import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Avatar, Box, Button, Chip, Grid, MenuItem, Paper, Select, Tab, Tabs, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import RadioButtonCheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import ViewCarouselRoundedIcon from "@material-ui/icons/ViewCarouselRounded";
import clsx from "clsx";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { saveAs } from "file-saver";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";

import Link from "components/Link";
import { Markdown } from "components/Markdown";
import { Api, APIVersion } from "store/subscriptions/types";
import { APIDetailParams } from "store/apiDetails/types";
import { AppData } from "store/applications/types";
import { getAllUserApps } from "store/applications/actions/getAllUserApps";
import { getAPIs } from "store/subscriptions/actions/getAPIs";
import { getAPIVersion } from "store/apiDetails/actions/getAPIVersion";
import { apiDetailsSelector } from "./selector";
import useStyles from "./styles";
import { CurrentAPIDetails } from "./types";
import noContracts from "assets/noAPIProducts.svg";

export const NewAPIDetails: React.FC = () => {
  const classes = useStyles();
  const { palette, spacing } = useTheme();

  const [t] = useTranslation();

  const history = useHistory();
  const dispatch = useDispatch();
  const { allUserApps, apiDetails, orgDetails, subscriptions, userDetails } = useSelector(apiDetailsSelector);

  /* Retrieval of API Product details */

  const { apiId, versionId } = useParams<APIDetailParams>();

  useEffect(() => {
    dispatch(getAPIs({}));
    dispatch(
      getAPIVersion({
        params: {
          apiId: apiId || "0",
          versionId: versionId || "0",
        },
      })
    );
    dispatch(getAllUserApps({ orgID: orgDetails.id }));
  }, [apiId, dispatch, orgDetails, versionId]);

  const [currentAPIDetails, setCurrentAPIDetails] = useState<CurrentAPIDetails>({
    appsSubbed: [],
    documentation: null,
    id: 0,
    name: "",
    otherVersions: [],
    version: null,
  });

  useEffect(() => {
    if (subscriptions.apis.length) {
      let currentAPI: Api | null = null;
      let otherAPIVersions: APIVersion[] = [];

      subscriptions.apis.forEach((api) => {
        if (api.id === apiDetails.version.apiId) {
          currentAPI = api;

          otherAPIVersions = api.apiVersions.filter((apiVersion) => {
            return apiVersion.id !== apiDetails.version.id;
          });
        }
      });

      const appsSubbedToAPI = allUserApps.filter((app) => {
        return app.subscriptions.includes(apiDetails.version.apiId);
      });

      setCurrentAPIDetails({
        appsSubbed: appsSubbedToAPI,
        documentation: currentAPI && currentAPI["docs"] ? currentAPI["docs"][0] : null,
        id: currentAPI ? currentAPI["id"] : 0,
        name: currentAPI ? currentAPI["name"] : "",
        otherVersions: otherAPIVersions,
        version: apiDetails.version,
      });
    }
  }, [apiDetails, allUserApps, subscriptions]);

  console.log("currentAPIDetails", currentAPIDetails);

  // const hasSpec = (): boolean => {
  //   return !!(currentAPIDetails && currentAPIDetails.version && currentAPIDetails.version.spec);
  // };

  const generateSubbedAppBubbles = (subbedApps: AppData[]) => {
    return subbedApps.map((app: AppData, index: number) => {
      return (
        <Link
          className={classes.appBubbles}
          key={`appBubble${index}`}
          to={{
            pathname: "/dashboard/subscriptions",
            state: {
              redirected: true,
              appID: app.id,
            },
          }}
        >
          <Avatar>
            {app.name[0].toUpperCase()}{app.name[1]}
          </Avatar>
        </Link>
      );
    });
  };

  const generateSelectorOptions = (apiVersions: APIVersion[]) => {
    return apiVersions.map((version, index) => {
      return (
        <MenuItem
          key={`selectorOption${index}`}
          onClick={() => history.push(`/api-products/new-details/${currentAPIDetails.id}/spec/${version.id}`)}
          value={version.id}
        >
          {`${version.title} (${version.version})`}
        </MenuItem>
      );
    });
  };

  const [selectedTab, setSelectedTab] = useState("apiInfo");

  const generateAPIInfo = () => {
    return (
      <>
        <Markdown
          defaultValue={currentAPIDetails.documentation?.info || "No description available."}
          page=""
        />

        {currentAPIDetails.version?.spec && (
          <Grid container>
            <Grid item md={8}>
              <Box mt={3} style={{ display: "flex" }}>
                {
                  currentAPIDetails.version.spec?.info?.termsOfService && (
                    <Typography style={{ color: palette.info.main, marginRight: spacing(3) }} variant="body1">
                      <Link to={currentAPIDetails.version.spec?.info?.termsOfService}>
                        Terms of Service
                      </Link>
                    </Typography>
                  )
                }

                {
                  currentAPIDetails.version.spec?.info?.contact?.url && (
                    <Typography style={{ color: palette.info.main, marginRight: spacing(3) }} variant="body1">
                      <Link to={currentAPIDetails.version.spec.info.contact.url}>
                        Contact
                      </Link>
                    </Typography>
                  )
                }

                {
                  currentAPIDetails.version.spec?.info?.license?.url && (
                    <Typography style={{ color: palette.info.main, marginRight: spacing(3) }} variant="body1">
                      <Link to={currentAPIDetails.version.spec.info.license.url}>
                        License
                      </Link>
                    </Typography>
                  )
                }

                {
                  currentAPIDetails.version.spec?.externalDocs?.url && (
                    <Typography style={{ color: palette.info.main, marginRight: spacing(3) }} variant="body1">
                      <Link to={currentAPIDetails.version.spec?.externalDocs?.url}>
                        External Documentation
                      </Link>
                    </Typography>
                  )
                }
              </Box>
            </Grid>

            <Grid item md={4}>
              <Box mt={3} style={{ display: "flex", height: 40, overflowX: "auto", textAlign: "right" }}>
                {
                  currentAPIDetails.version.spec?.tags?.map((
                    tag: {
                      name: string,
                      description: string,
                    },
                    index: number
                  ) => {
                    return (
                      <Chip
                        color="secondary"
                        key={`tagChip${index}`}
                        label={tag.name}
                        size="small"
                        style={{ marginRight: spacing(1.25) }}
                      />
                    );
                  })
                }
              </Box>
            </Grid>
          </Grid>
        )
        }
      </>
    );
  };

  const generateAPIContract = () => {
    return <SwaggerUI spec={currentAPIDetails.version?.spec || {}} />;
  };

  const generateAPIVersionDetails = () => {
    return (
      <>
        <Select
          className={classes.apiContractSelector}
          disableUnderline
          displayEmpty
          IconComponent={ExpandMoreRoundedIcon}
          label="Select OpenAPI Contract"
          renderValue={() => `${currentAPIDetails.name} (${currentAPIDetails.version?.version})`}
        >
          {generateSelectorOptions(currentAPIDetails.otherVersions)}
        </Select>

        <Grid container>
          <Grid item md={9}>
            <Box mt={5} style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ color: palette.text.primary, fontWeight: 700, marginRight: spacing(3) }} variant="h5">
                {currentAPIDetails.version?.title}
              </Typography>

              <Chip
                color="secondary"
                label={currentAPIDetails.version?.version}
                size="small"
                style={{ marginRight: spacing(1.5) }}
              />

              <Chip
                className={currentAPIDetails.version?.live ? classes.prodChip : classes.draftChip}
                label={currentAPIDetails.version?.live ? "Live" : "Draft"}
                size="small"
              />
            </Box>
          </Grid>

          <Grid item md={3}>
            <Box mt={4} style={{ textAlign: "right" }}>
              <Button
                style={{ borderColor: palette.secondary.main, color: palette.text.primary }}
                //onClick={() => downloadContract()}
                variant="outlined"
              >
                Donwload contract
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Paper className={classes.tabsOuterContainer} square>
          <Tabs
            centered
            className={classes.tabsInnerContainer}
            TabIndicatorProps={{
              style: { background: palette.info.main, height: 3 },
            }}
            value={selectedTab}
            variant="fullWidth"
          >
            <Tab
              label="API Info"
              onClick={() => setSelectedTab("apiInfo")}
              style={{ borderRight: `1px solid ${palette.grey[300]}`, borderBottom: `1px solid ${palette.grey[300]}` }}
              value="apiInfo"
            />

            <Tab
              label="API Contract"
              onClick={() => setSelectedTab("apiContract")}
              style={{ borderBottom: `1px solid ${palette.grey[300]}` }}
              value="apiContract"
            />
          </Tabs>

          <Box pb={4} pt={3} px={3} style={{ overflow: "hidden", overflowX: "auto" }}>
            {
              selectedTab === "apiInfo" && generateAPIInfo()
            }

            {
              selectedTab === "apiContract" && generateAPIContract()
            }
          </Box>
        </Paper>
      </>
    );
  };

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

  // TODO: Temporary until API is reworked to support carousel highlight cards
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
    
  return (
    <>
      {/* Colored banner section */}
      <Box
        className={
          clsx(classes.backgroundBanner, {
            [classes.prodAccessibleAPIProductBanner]: apiDetails.version.live,
            [classes.draftAPIProductBanner]: !apiDetails.version.live,
          })
        }
      >
        <Box className={classes.bannerContentContainer}>
          <Box mb={1.25}>
            <Typography display="block" variant="h3" style={{ color: palette.text.primary }}>
              {currentAPIDetails.name}
            </Typography>
          </Box>

          <Box mb={1.25}>
            <Typography display="block" style={{ color: palette.text.primary, fontWeight: 300 }} variant="h5">
              {currentAPIDetails.version?.title}
            </Typography>
          </Box>

          <Grid container>
            {
              currentAPIDetails.version?.version && (
                <Grid item>
                  <Box mr={1.25}>
                    <Chip color="secondary" label={currentAPIDetails.version.version} size="small" />
                  </Box>
                </Grid>
              )
            }

            <Grid item>
              <Box>
                <Chip
                  className={currentAPIDetails.version?.live ? classes.prodChip : classes.draftChip}
                  label={currentAPIDetails.version?.live ? "Production access" : "Draft"}
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>

          <Box mt={1.25}>
            {/* TODO: According to the design team, this is to be provided by an Admin
            once a 'Description' field is made available in the 'Admin area'.
            Leave this in. */}
            {/*
            <Typography display="block" style={{ fontStyle: "italic", fontWeight: 300 }} variant="body1">
            Description support coming soon!
            </Typography>
            */}
          </Box>
        </Box>
      </Box>

      {/* Apps subbed to API Product section */}
      <Box className={classes.contentContainer} mx='auto'>
        <Grid container>
          <Grid item md={9}>
            <Box mt={3}>
              <Typography display="block" style={{ color: palette.text.primary, fontWeight: 300 }} variant="caption">
                Applications subscribed to this product:
              </Typography>

              {
                currentAPIDetails.appsSubbed.length
                  ? (
                    <Box mt={1.25} className={classes.subbedAppBubblesContainer}>
                      {generateSubbedAppBubbles(currentAPIDetails.appsSubbed)}
                    </Box>
                  ) : (
                    <Typography display="block" style={{ color: palette.text.primary }} variant="body1">
                      No applications are subscribed to this product yet.
                    </Typography>
                  )
              }
            </Box>
          </Grid>

          <Grid item md={3}>
            <Box mt={7} style={{ textAlign: "right" }}>
              <Link
                className={classes.linkToSubsModal}
                to="/dashboard/subscriptions"
              >
                <Typography style={{ display: "inline", color: palette.common.white, fontWeight: 700 }}>
                  Subscribe product
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* API Publications section */}
      <Box className={classes.contentContainer} mb={7.5} mx='auto'>
        <Grid container>
          <Grid item md={!currentAPIDetails.version ? 9 : 12}>
            <Box mt={5} mb={3}>
              <Typography display="block" style={{ color: palette.text.primary }} variant="h4">
                API Publications
              </Typography>

              <Box mt={3}>
                {
                  !currentAPIDetails.version
                    ? (
                      <>
                        <Box>
                          <Typography
                            display="block"
                            style={{ color: palette.text.primary, fontWeight: 700 }}
                            variant="body1"
                          >
                            This product doesn’t have a contract yet.
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            display="block"
                            style={{ color: palette.text.primary }}
                            variant="body1"
                          >
                            We have not added a contract entry to this API Product yet.
                            Once we add a contract to this API Product, you will be able to subscribe to its APIs!
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      generateAPIVersionDetails()
                    )
                }
              </Box>
            </Box>
          </Grid>

          {
            !currentAPIDetails.version && (
              <Grid item md={3}>
                <Box mt={7}>
                  <img src={noContracts} />
                </Box>
              </Grid>
            )
          }
        </Grid>
      </Box>

      {/* API Highlights section */}
      <Box className={classes.highlightsBackgroundBanner}>
        <Box mb={8}>
          <Carousel
            showNavigation
            slides={carouselHighlights}
            goToSlide={currentSlide}
          />
        </Box>

        {/* TODO: Temporary until API is reworked to support carousel highlight cards. */}
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
    </>
  );
};
