import { Box, Heading, Text } from '@chakra-ui/react'
import { BRAND_COLORS } from './brand'

type LymnconModalPlaceholderProps = {
  title?: string
  message?: string
}

export function LymnconModalPlaceholder({
  title = 'Modal Placeholder',
  message = 'This will be replaced by full modal logic later.',
}: LymnconModalPlaceholderProps) {
  return (
    <Box
      border="1px solid"
      borderColor={BRAND_COLORS.border}
      borderRadius="lg"
      p={5}
      bg="white"
      boxShadow="0 8px 24px rgba(1, 74, 141, 0.12)"
      borderTop="4px solid"
      borderTopColor={BRAND_COLORS.red}
    >
      <Heading size="md" mb={2} color={BRAND_COLORS.blue}>
        {title}
      </Heading>
      <Text color="#4A5568">{message}</Text>
    </Box>
  )
}
