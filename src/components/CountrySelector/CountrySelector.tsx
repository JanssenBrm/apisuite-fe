import React from "react";
import { i18n, TextField, useTheme } from "@apisuite/fe-base";
import countries from "i18n-iso-countries";
import { Autocomplete } from "@material-ui/lab";

import { CountrySelectorProps } from "./types";
import useStyles from "./styles";

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countrySelectionHandler,
  // selectedCountry,
}) => {
  const classes = useStyles();
  const { spacing } = useTheme();

  const userLanguageCode = i18n.language.substr(0, 2);

  // Retrieves all countries in the user's currently selected language (e.g., 'Brasil' in pt-PT, 'Brazil' in en-UK/US)
  countries.registerLocale(require(`i18n-iso-countries/langs/${userLanguageCode}.json`));

  const countryCodesAndNames = countries.getNames(userLanguageCode);
  const autoCompleteOptions = Object.entries(countryCodesAndNames).map((country) => ({
    countryCode: country[0],
    countryName: country[1],
  }));

  const countryCodeToFlag = (countryCode: string) => {
    return typeof String.fromCodePoint !== "undefined"
      ? countryCode.replace(/./g, (code) => String.fromCodePoint(code.charCodeAt(0) + 127397))
      : countryCode;
  };

  return (
    <Autocomplete
      // defaultValue={
      //   selectedCountry
      //     ? autoCompleteOptions.find((option) => option.countryName === selectedCountry)
      //     : undefined
      // }
      disableClearable
      getOptionLabel={(option) => option.countryName}
      onChange={(_event, value) => countrySelectionHandler(value!.countryName)}
      options={autoCompleteOptions}
      renderInput={
        (inputParameters) => {
          return (
            <TextField
              {...inputParameters}
              className={classes.inputFields}
              label="Country"
              variant="outlined" />
          );
        }
      }
      renderOption={(option) => (
        <React.Fragment>
          <span style={{ marginRight: spacing(1) }}>
            {countryCodeToFlag(option.countryCode)}
          </span>

          <span>{option.countryName}</span>
        </React.Fragment>
      )}
      size='small'
    />
  );
};

export default CountrySelector;
