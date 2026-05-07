declare module 'react-select-country-list' {
  interface CountryData {
    label: string
    value: string
  }
  interface CountryList {
    getData: () => CountryData[]
    getLabels: () => string[]
    getValues: () => string[]
    getLabel: (value: string) => string
    getValue: (label: string) => string
  }
  function countryList(): CountryList
  export default countryList
}
