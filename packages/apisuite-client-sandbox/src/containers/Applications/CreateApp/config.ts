export const radioOptions = [
  {
    value: 'private',
    label: 'Public',
    desc: 'This application is eligible for display on the Integrations Marketplace',
    disabled: true,
    checked: false,
  },
  {
    value: 'private',
    label: 'Private',
    desc: 'This application is intended only for testing or private use',
    disabled: false,
    checked: true,
  },
]

export const selectOptions = [
  // {
  //   label: 'Petstore API v1',
  //   value: 'petstore-v1',
  //   group: "Common sandbox API's",
  // },
  // {
  //   label: 'Star Wars API v2',
  //   value: 'startw-v2',
  //   group: "Common sandbox API's",
  // },
  // {
  //   label: 'UK Standard AIS API',
  //   value: 'uk-s-ais',
  //   group: "Openbanking sandbox API's",
  // },
  {
    label: 'UK Standard PIS API',
    value: 'uk-s-pis',
    group: "Openbanking sandbox API's",
  },
]
