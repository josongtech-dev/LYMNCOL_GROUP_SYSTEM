import { Badge, type BadgeProps } from '@chakra-ui/react'
import { BRAND_COLORS } from './brand'

type LymnconBadgeProps = BadgeProps

export function LymnconBadge(props: LymnconBadgeProps) {
  return (
    <Badge
      bg={BRAND_COLORS.gold}
      color="#1A202C"
      borderRadius="full"
      px={3}
      py={1}
      fontWeight="bold"
      {...props}
    />
  )
}
