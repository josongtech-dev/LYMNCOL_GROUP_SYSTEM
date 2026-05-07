import { useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import ReactCountryFlag from 'react-country-flag'
import { getCountryCallingCode } from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'
import { BRAND_COLORS } from './brand'

export type LymnconCountryOption = {
  label: string
  value: string
}

type LymnconCountrySelectProps = {
  value: LymnconCountryOption | null
  onChange: (country: LymnconCountryOption | null, dialCode: string) => void
  placeholder?: string
}

export function LymnconCountrySelect({
  value,
  onChange,
  placeholder = 'Select country',
}: LymnconCountrySelectProps) {
  const countries = useMemo(() => countryList().getData(), [])

  return (
    <Select<LymnconCountryOption, false>
      options={countries}
      value={value}
      onChange={(country) => {
        if (!country) {
          onChange(null, '')
          return
        }
        const dialCode = `+${getCountryCallingCode(country.value as CountryCode)}`
        onChange(country, dialCode)
      }}
      placeholder={placeholder}
      isSearchable
      formatOptionLabel={(country) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ReactCountryFlag
            svg
            countryCode={country.value}
            style={{ width: '1.1em', height: '1.1em', borderRadius: '2px' }}
          />
          <span>{country.label}</span>
        </span>
      )}
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: '40px',
          borderColor: state.isFocused ? BRAND_COLORS.blue : BRAND_COLORS.border,
          boxShadow: state.isFocused ? `0 0 0 1px ${BRAND_COLORS.blue}` : 'none',
          borderRadius: '0.5rem',
          '&:hover': { borderColor: BRAND_COLORS.blue },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? '#E6EEF6' : 'white',
          color: BRAND_COLORS.text,
        }),
      }}
    />
  )
}
