import { Box, Flex, Icon, Spinner, Stack, Text } from '@chakra-ui/react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import type { ReactNode } from 'react'
import { BRAND_COLORS, LymnconButton } from '../../lymncon_component'

type Props = {
  isLoading: boolean
  error: string | null
  isEmpty?: boolean
  emptyMessage?: string
  onRetry?: () => void
  children: ReactNode
}

/**
 * Wraps async content with loading spinner, error state, and empty state.
 * Use this around any section driven by useAsync() to ensure consistent UX
 * across all pages once real API data is wired.
 */
export function AsyncStateWrapper({
  isLoading,
  error,
  isEmpty,
  emptyMessage = 'No records found.',
  onRetry,
  children,
}: Props) {
  if (isLoading) {
    return (
      <Flex justify="center" align="center" py={16}>
        <Spinner size="lg" color={BRAND_COLORS.blue} borderWidth="3px" />
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex direction="column" align="center" py={16} gap={4}>
        <Box p={4} bg="red.50" borderRadius="full" color="red.500">
          <Icon as={AlertCircle} boxSize={8} />
        </Box>
        <Stack gap={1} textAlign="center">
          <Text fontWeight="bold" color="gray.700">Something went wrong</Text>
          <Text fontSize="sm" color="gray.500">{error}</Text>
        </Stack>
        {onRetry && (
          <LymnconButton
            label="Try Again"
            size="sm"
            variant="outline"
            leftIcon={<Icon as={RefreshCw} boxSize={4} />}
            onClick={onRetry}
          />
        )}
      </Flex>
    )
  }

  if (isEmpty) {
    return (
      <Flex justify="center" align="center" py={16}>
        <Text color="gray.400" fontSize="sm">{emptyMessage}</Text>
      </Flex>
    )
  }

  return <>{children}</>
}
