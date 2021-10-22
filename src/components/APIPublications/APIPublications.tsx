import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Chip, Grid, MenuItem, Paper, Select, Tab, Tabs, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { saveAs } from "file-saver";

import noContracts from "assets/noAPIProducts.svg";
import Link from "components/Link";
import { Markdown } from "components/Markdown";
import { APIVersion } from "store/subscriptions/types";
import { APIPublicationsProps } from "./types";
import useStyles from "./styles";

export const APIPublications: React.FC<APIPublicationsProps> = ({
  currentAPIDetails,
}) => {
  const classes = useStyles();
  const { palette, spacing } = useTheme();

  const [t] = useTranslation();

  const history = useHistory();

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

  return (
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
  );
};
