import { Input, type InputProps, Box, Text } from '@chakra-ui/react'
import { BRAND_COLORS, TYPOGRAPHY } from './brand'

interface LymnconInputProps extends InputProps {
  error?: string
}

export function LymnconInput({ error, ...props }: LymnconInputProps) {
  return (
    <Box w="100%">
      <Input
        bg="white/50"
        borderColor={error ? BRAND_COLORS.red : BRAND_COLORS.border}
        borderRadius="lg"
        fontSize={TYPOGRAPHY.body.size}
        fontWeight={TYPOGRAPHY.body.weight}
        _placeholder={{ color: 'gray.400' }}
        _focusVisible={{ 
          borderColor: error ? BRAND_COLORS.red : BRAND_COLORS.blue, 
          boxShadow: `0 0 0 2px ${error ? 'rgba(150, 31, 34, 0.2)' : 'rgba(1, 74, 141, 0.2)'}`,
          outline: 'none'
        }}
        transition="all 0.2s"
        {...props}
      />
      {error && (
        <Text color={BRAND_COLORS.red} fontSize={TYPOGRAPHY.caption.size} mt={1} fontWeight="500">
          {error}
        </Text>
      )}
    </Box>
  )
}
