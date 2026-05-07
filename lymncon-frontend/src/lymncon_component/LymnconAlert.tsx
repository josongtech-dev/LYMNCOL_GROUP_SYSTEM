import { Alert, Text } from '@chakra-ui/react'
import { BRAND_COLORS } from './brand'

type LymnconAlertStatus = 'info' | 'success' | 'warning' | 'error'

type LymnconAlertProps = {
  title: string
  status?: LymnconAlertStatus
}

export function LymnconAlert({ title, status = 'info' }: LymnconAlertProps) {
  const accentColor =
    status === 'error'
      ? BRAND_COLORS.red
      : status === 'warning'
        ? BRAND_COLORS.gold
        : BRAND_COLORS.blue

  return (
    <Alert.Root
      status={status}
      borderRadius="md"
      border="1px solid"
      borderColor={accentColor}
      bg={`${accentColor}15`}
      w="100%"
    >
      <Alert.Indicator />
      <Alert.Content>
        <Text fontWeight="semibold" color={accentColor} whiteSpace="normal">
          {title}
        </Text>
      </Alert.Content>
    </Alert.Root>
  )
}
