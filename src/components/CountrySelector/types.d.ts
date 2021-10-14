export interface CountrySelectorProps {
  countrySelectionHandler: (countryCode: string) => void,
  selectedCountry: string,
}