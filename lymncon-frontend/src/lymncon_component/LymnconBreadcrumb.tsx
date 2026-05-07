import { HStack, Text } from '@chakra-ui/react'
import { LymnconLink } from './LymnconLink'
import { BRAND_COLORS } from './brand'

type BreadcrumbItem = {
  label: string
  href?: string
}

type LymnconBreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function LymnconBreadcrumb({ items }: LymnconBreadcrumbProps) {
  return (
    <HStack gap={2} wrap="wrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <HStack gap={2} key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <LymnconLink label={item.label} href={item.href} />
            ) : (
              <Text color={isLast ? BRAND_COLORS.red : '#4A5568'} fontWeight={isLast ? 'bold' : 'normal'}>
                {item.label}
              </Text>
            )}
            {!isLast && <Text color={BRAND_COLORS.gold}>/</Text>}
          </HStack>
        )
      })}
    </HStack>
  )
}
