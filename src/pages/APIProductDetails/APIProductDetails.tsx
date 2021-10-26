import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, useTheme } from "@apisuite/fe-base";

import { APIFeatureCards } from "components/APIFeatureCards";
import { APIHighlights } from "components/APIHighlights";
import { APIProductBanner } from "components/APIProductBanner";
import { APIPublications } from "components/APIPublications";
import { APIUses } from "components/APIUses";
import { SubbedAppsBlock } from "components/SubbedAppsBlock";
import { Api, APIVersion } from "store/subscriptions/types";
import { APIDetailParams } from "store/apiDetails/types";
import { getAllUserApps } from "store/applications/actions/getAllUserApps";
import { getAPIs } from "store/subscriptions/actions/getAPIs";
import { getAPIVersion } from "store/apiDetails/actions/getAPIVersion";
import { apiDetailsSelector } from "./selector";
import { CurrentAPIDetails } from "./types";

export const APIProductDetails: React.FC = () => {
  const { palette } = useTheme();

  const dispatch = useDispatch();
  const { allUserApps, apiDetails, orgDetails, requested, subscriptions } = useSelector(apiDetailsSelector);

  /* Retrieval of API Product details */

  const { apiId, versionId } = useParams<APIDetailParams>();

  useEffect(() => {
    dispatch(getAPIs({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAPIVersion({
        params: {
          apiId: apiId || "0",
          versionId: versionId || "0",
        },
      })
    );
  }, [apiId, dispatch, versionId]);

  useEffect(() => {
    dispatch(getAllUserApps({ orgID: orgDetails.id }));
  }, [dispatch, orgDetails]);

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
  
  if (!requested) {
    return (
      <Box mt={-6.25} style={{ left: "50%", position: "absolute", top: "50%" }}>
        <CircularProgress color="primary" style={{ height: 50, width: 50 }} />
      </Box>
    );
  }

  return (
    <Box style={{ backgroundColor: palette.background.default }}>
      {/* API banner */}
      <APIProductBanner currentAPIDetails={currentAPIDetails} />

      {/* Apps subbed to API Product section */}
      <SubbedAppsBlock currentAPIDetails={currentAPIDetails} />

      {/* API Publications section */}
      <APIPublications currentAPIDetails={currentAPIDetails} />

      {/* API Highlights section */}
      <APIHighlights />

      {/* 'Use this API to...' section */}
      <APIUses />

      {/* API features section */}
      <APIFeatureCards />
    </Box >
  );
};
