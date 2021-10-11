import React, { useEffect, useState } from "react";
import { i18n, TextField, useTheme } from "@apisuite/fe-base";
import countries from "i18n-iso-countries";
import { Autocomplete } from "@material-ui/lab";

import { CountrySelectorProps } from "./types";
import useStyles from "./styles";

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countrySelectionHandler,
  selectedCountry,
}) => {
  const classes = useStyles();
  const { spacing } = useTheme();

  /* Country selector set-up */

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

  /* Country selector logic */

  const [selectedCountryOption, setSelectedCountryOption] = useState<{
    countryCode: string,
    countryName: string,
  }>({ countryCode: "", countryName: "" });

  useEffect(() => {
    const optionObject = autoCompleteOptions.find((option) => option.countryName === selectedCountry);

    if (optionObject) setSelectedCountryOption(optionObject);
  }, [selectedCountry]);

  const [selectedCountryText, setSelectedCountryText] = useState("");

  useEffect(() => {
    setSelectedCountryText(selectedCountry);
  }, [selectedCountry]);

  return (
    <Autocomplete
      disableClearable
      getOptionLabel={(option) => option.countryName}
      // Handles the component's exhibited text
      inputValue={selectedCountryText}
      onInputChange={(_event, newSelectedCountryText) => {
        setSelectedCountryText(newSelectedCountryText);
      }}
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
      // Handles the component's presently selected option
      value={selectedCountryOption}
      onChange={(_event, value) => countrySelectionHandler(value!.countryName)}
    />
  );
};

export default CountrySelector;
