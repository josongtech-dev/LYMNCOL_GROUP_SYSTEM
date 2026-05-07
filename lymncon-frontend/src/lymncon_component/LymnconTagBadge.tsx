import { Badge } from '@chakra-ui/react'

type LymnconTagBadgeProps = {
  label: string
  tone?: 'blue' | 'gold' | 'green'
}

const toneStyles = {
  blue: { bg: '#014A8D', color: '#FFFFFF' },
  gold: { bg: '#7A5A10', color: '#FFFFFF' },
  green: { bg: '#166534', color: '#FFFFFF' },
}

export function LymnconTagBadge({ label, tone = 'blue' }: LymnconTagBadgeProps) {
  return (
    <Badge
      px={4}
      py={1}
      borderRadius="full"
      fontSize="10px"
      fontWeight="bold"
      {...toneStyles[tone]}
    >
      {label}
    </Badge>
  )
}
