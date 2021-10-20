import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Carousel from "react-spring-3d-carousel";
import { Avatar, Box, Button, Chip, Grid, MenuItem, Paper, Select, Tab, Tabs, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import RadioButtonCheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import ViewCarouselRoundedIcon from "@material-ui/icons/ViewCarouselRounded";
import clsx from "clsx";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { saveAs } from "file-saver";

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

export const APIProductDetails: React.FC = () => {
  const classes = useStyles();
  const { palette, shape, spacing } = useTheme();

  const [t] = useTranslation();

  const history = useHistory();
  const dispatch = useDispatch();
  const { allUserApps, apiDetails, orgDetails, subscriptions } = useSelector(apiDetailsSelector);

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
              apiID: currentAPIDetails.id,
              apiVersionID: currentAPIDetails.version?.id,
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
          onClick={() => history.push(`/api-products/details/${currentAPIDetails.id}/spec/${version.id}`)}
          value={version.id}
        >
          {`${version.title} (${version.version})`}
        </MenuItem>
      );
    });
  };

  const downloadContract = () => {
    const fileName = "contract.json";

    const fileToSave = new Blob(
      [JSON.stringify(currentAPIDetails.version?.spec)],
      {
        type: "application/json",
      }
    );

    saveAs(fileToSave, fileName);
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
            <Grid item md={9}>
              <Box mt={3} style={{ display: "flex" }}>
                {
                  currentAPIDetails.version.spec?.info?.termsOfService && (
                    <Typography style={{ color: palette.info.main, marginRight: spacing(3) }} variant="body1">
                      <Link to={currentAPIDetails.version.spec?.info?.termsOfService}>
                        {t("apiProductDetails.tosLinkLabel")}
                      </Link>
                    </Typography>
                  )
                }

                {
                  currentAPIDetails.version.spec?.info?.contact?.url && (
                    <Typography style={{ color: palette.info.main, marginRight: spacing(3) }} variant="body1">
                      <Link to={currentAPIDetails.version.spec.info.contact.url}>
                        {t("apiProductDetails.contactLinkLabel")}
                      </Link>
                    </Typography>
                  )
                }

                {
                  currentAPIDetails.version.spec?.info?.license?.url && (
                    <Typography style={{ color: palette.info.main, marginRight: spacing(3) }} variant="body1">
                      <Link to={currentAPIDetails.version.spec.info.license.url}>
                        {t("apiProductDetails.licenseLinkLabel")}
                      </Link>
                    </Typography>
                  )
                }

                {
                  currentAPIDetails.version.spec?.externalDocs?.url && (
                    <Typography style={{ color: palette.info.main, marginRight: spacing(3) }} variant="body1">
                      <Link to={currentAPIDetails.version.spec?.externalDocs?.url}>
                        {t("apiProductDetails.externalDocsLinkLabel")}
                      </Link>
                    </Typography>
                  )
                }
              </Box>
            </Grid>

            <Grid item md={3}>
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
          disabled={!currentAPIDetails.otherVersions.length}
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
                className={currentAPIDetails.version?.live ? classes.prodChip : classes.deprecatedChip}
                label={currentAPIDetails.version?.live ? "Live" : "Deprecated"}
                size="small"
              />
            </Box>
          </Grid>

          <Grid item md={3}>
            <Box mt={4} style={{ textAlign: "right" }}>
              <Button
                style={{ borderColor: palette.secondary.main, color: palette.text.primary }}
                onClick={() => downloadContract()}
                variant="outlined"
              >
                {t("apiProductDetails.downloadContractButtonLabel")}
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

  const useAPICardGenerator = (
    title: string,
    description: string,
    image?: string,
  ) => {
    return (
      <Grid item md={6}>
        <Box mb={2}>
          {
            image
              ? <img src={image} />
              : <ViewCarouselRoundedIcon className={classes.highlightIcon} />
          }
        </Box>

        <Box mb={3}>
          <Typography display="block" style={{ color: palette.primary.main }} variant="h6">
            {title}
          </Typography>
        </Box>

        <Box>
          <Typography display="block" style={{ color: palette.text.primary }} variant="body1">
            {description}
          </Typography>
        </Box>
      </Grid>
    );
  };

  // TODO: Temporary placeholders until UI & API are reworked to support this section's cards.
  const useAPICardsContent = [
    useAPICardGenerator("Give insights", "We want to help you to create value-added services and applications. Therefore we give our customers the possibility to give access to their account information if so desired. Combining this data with other valuable data sources puts you in a unique position to give meaningful financial insights to our customers."),
    useAPICardGenerator("Advise", "Giving our customers the possibility to give access to their account information will allow you to go beyond mere insights and give added value advice around spending and earnings decisions in accordance with our customers’ lifestyles."),
    useAPICardGenerator("Do something else entirely", "A human being is a part of the whole that we call 'Universe', a part limited in time and space. He experiences himself, his thoughts and feeling as something separated from the rest, a kind of optical delusion of his consciousness. This delusion is a kind of prison for us, restricting us to our personal desires and to affection for a few persons nearest to us. Our task must be to free ourselves from this prison by widening our circle of compassion to embrace all living creatures and the whole of nature in its beauty."),
  ];

  const apiFeatureCardsGenerator = (
    title: string,
    description: string,
    image?: string,
  ) => {
    return (
      <Grid item md={3}>
        <Box px={3} py={3} style={{ backgroundColor: palette.background.paper, borderRadius: shape.borderRadius }}>
          <Box mb={2} className={classes.apiFeatureIcon}>
            {
              image
                ? <img src={image} />
                : <ViewCarouselRoundedIcon />
            }
          </Box>

          <Box mb={1}>
            <Typography display="block" style={{ color: palette.primary.main, fontWeight: 700 }} variant="body1">
              {title}
            </Typography>
          </Box>

          <Box>
            <Typography display="block" style={{ color: palette.text.secondary }} variant="body2">
              {description}
            </Typography>
          </Box>
        </Box>
      </Grid>
    );
  };

  // TODO: Temporary placeholders until UI & API are reworked to support this section's cards.
  const apiFeatureCardsContent = [
    apiFeatureCardsGenerator("API Feature A", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature B", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature C", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature D", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature E", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature F", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
    apiFeatureCardsGenerator("API Feature G", "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing."),
  ];

  return (
    <Box style={{ backgroundColor: palette.background.default }}>
      {/* Colored banner section */}
      <Box
        className={
          clsx(classes.backgroundBanner, {
            [classes.prodAccessibleAPIProductBanner]: apiDetails.version.live,
            [classes.docsAccessibleAPIProductBanner]: !apiDetails.version.live,
          })
        }
      >
        <Box className={classes.bannerContentContainer}>
          <Box mb={1.25}>
            <Typography display="block" variant="h3" style={{ color: palette.text.primary }}>
              {currentAPIDetails.name}
            </Typography>
          </Box>

          {
            currentAPIDetails.version?.title && (
              <Box mb={1.25}>
                <Typography display="block" style={{ color: palette.text.primary, fontWeight: 300 }} variant="h5">
                  {currentAPIDetails.version.title}
                </Typography>
              </Box>
            )
          }

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
                  className={currentAPIDetails.version?.live ? classes.prodChip : classes.docsChip}
                  label={
                    currentAPIDetails.version?.live
                      ? t("apiProductDetails.productionAccess")
                      : t("apiProductDetails.documentationAccess")
                  }
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>

          <Box mt={1.25}>
            {/* TODO: According to the design team, this is to be provided by an Admin
once a 'Description' field is made available in the 'Admin area'. */}
            {/* <Typography display="block" style={{ fontWeight: 300 }} variant="body1">
Description support coming soon!
</Typography> */}
          </Box>
        </Box>
      </Box>

      {/* Apps subbed to API Product section */}
      <Box className={classes.contentContainer} mx='auto'>
        <Grid container>
          <Grid item md={9}>
            <Box mt={3}>
              <Typography display="block" style={{ color: palette.text.primary, fontWeight: 300 }} variant="caption">
                {t("apiProductDetails.appsSubbedTitle")}
              </Typography>

              {
                currentAPIDetails.appsSubbed.length
                  ? (
                    <Box mt={1.25} className={classes.subbedAppBubblesContainer}>
                      {generateSubbedAppBubbles(currentAPIDetails.appsSubbed)}
                    </Box>
                  ) : (
                    <Typography display="block" style={{ color: palette.text.primary }} variant="body1">
                      {t("apiProductDetails.noAppsSubbedText")}
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
                  {t("apiProductDetails.subscribeButtonLabel")}
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
                {t("apiProductDetails.apiPublicationsTitle")}
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
                            {t("apiProductDetails.noContractText")}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            display="block"
                            style={{ color: palette.text.primary }}
                            variant="body1"
                          >
                            {t("apiProductDetails.noContractSubtext")}
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
      {
        carouselHighlights.length && (
          <Box className={classes.highlightsBackgroundBanner}>
            <Box mb={8}>
              <Carousel
                showNavigation
                slides={carouselHighlights}
                goToSlide={currentSlide}
              />
            </Box>

            {/* TODO: Temporary until UI & API are reworked to support carousel highlight cards. */}
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
      }


      {/* 'Use this API to...' section */}
      {
        useAPICardsContent.length && (
          <Box className={classes.contentContainer} mx='auto' my={7.5}>
            <Box mb={3}>
              <Typography display="block" style={{ color: palette.text.primary }} variant="h4">
                {t("apiProductDetails.useThisAPITitle")}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {useAPICardsContent}
            </Grid>
          </Box>
        )
      }

      {/* API features section */}
      {
        apiFeatureCardsContent.length && (
          <Box className={classes.contentContainer} mx='auto' my={0} pb={9.25}>
            <Box mb={3}>
              <Typography display="block" style={{ color: palette.text.primary }} variant="h4">
                {t("apiProductDetails.apiFeaturesTitle")}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {apiFeatureCardsContent}
            </Grid>
          </Box>
        )
      }
    </Box>
  );
};
