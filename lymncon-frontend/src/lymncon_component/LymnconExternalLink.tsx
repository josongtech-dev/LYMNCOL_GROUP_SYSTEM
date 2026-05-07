import { Link } from '@chakra-ui/react'
import { BRAND_COLORS } from './brand'

type LymnconExternalLinkProps = {
  href: string
  label: string
}

export function LymnconExternalLink({ href, label }: LymnconExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      color="white"
      bg={BRAND_COLORS.blue}
      px={2}
      py={0.5}
      borderRadius="md"
      fontWeight="bold"
      textDecoration="none"
      _hover={{ bg: '#013a6f', color: 'white' }}
    >
      {label}
    </Link>
  )
}
