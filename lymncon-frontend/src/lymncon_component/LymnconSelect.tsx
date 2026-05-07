import { Box, NativeSelect, Text } from '@chakra-ui/react'
import { BRAND_COLORS, TYPOGRAPHY } from './brand'

type Option = {
  label: string
  value: string
}

interface LymnconSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[]
  error?: string
  placeholder?: string
}

export function LymnconSelect({
  options,
  error,
  placeholder = 'Select option',
  ...props
}: LymnconSelectProps) {
  return (
    <Box w="100%">
      <NativeSelect.Root>
        <NativeSelect.Field
          bg="white/50"
          borderColor={error ? BRAND_COLORS.red : BRAND_COLORS.border}
          borderRadius="lg"
          fontSize={TYPOGRAPHY.body.size}
          fontWeight={TYPOGRAPHY.body.weight}
          transition="all 0.2s"
          _focusVisible={{ 
            borderColor: error ? BRAND_COLORS.red : BRAND_COLORS.blue, 
            boxShadow: `0 0 0 2px ${error ? 'rgba(150, 31, 34, 0.2)' : 'rgba(1, 74, 141, 0.2)'}`,
            outline: 'none'
          }}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      {error && (
        <Text color={BRAND_COLORS.red} fontSize={TYPOGRAPHY.caption.size} mt={1} fontWeight="500">
          {error}
        </Text>
      )}
    </Box>
  )
}
