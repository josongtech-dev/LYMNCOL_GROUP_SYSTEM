import { Box, Text } from '@chakra-ui/react'
import { BRAND_COLORS } from './brand'

type LymnconProgressProps = {
  value: number
}

export function LymnconProgress({ value }: LymnconProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value))
  const progressColor =
    safeValue < 35 ? BRAND_COLORS.red : safeValue < 70 ? BRAND_COLORS.gold : BRAND_COLORS.green

  return (
    <Box>
      <Box h="10px" bg="#EEF2F6" borderRadius="full" overflow="hidden">
        <Box
          h="100%"
          bg={progressColor}
          width={`${safeValue}%`}
        />
      </Box>
      <Text mt={2} fontSize="sm" color={progressColor} fontWeight="semibold">
        {safeValue}% complete
      </Text>
    </Box>
  )
}
