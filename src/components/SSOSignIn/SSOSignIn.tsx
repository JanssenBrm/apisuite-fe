import React, { useEffect } from "react";
import qs from "qs";
import { Box, Typography, useTranslation } from "@apisuite/fe-base";

import { LOCAL_STORAGE_KEYS } from "constants/global";
import { SSOSignInProps } from "./types";

const SSOSignIn: React.FC<SSOSignInProps> = ({ ssoTokenExchange }) => {
  const [t] = useTranslation();

  useEffect(() => {
    // URL parameters
    const allURLParameters = qs.parse(window.location.search.slice(1));
    const stateParameter = allURLParameters.state;

    // Local storage's tidbits of information
    const stateCodeInLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE);
    const providerInLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.SSO_PROVIDER_STATE_STORAGE);

    if (stateParameter === stateCodeInLocalStorage && providerInLocalStorage) {
      ssoTokenExchange({ code: allURLParameters.code as string, provider: providerInLocalStorage });
    }
  }, [ssoTokenExchange]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Typography variant="h2">{t("signInForm.ssoSignInPleaseHoldMessage")}</Typography>
    </Box>
  );
};

export default SSOSignIn;
