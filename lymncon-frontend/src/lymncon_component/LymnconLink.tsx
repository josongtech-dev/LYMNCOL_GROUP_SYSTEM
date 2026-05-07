import { Link as ChakraLink } from '@chakra-ui/react'
import { BRAND_COLORS } from './brand'

type LymnconLinkProps = {
  label: string
  href: string
}

export function LymnconLink({ label, href }: LymnconLinkProps) {
  return (
    <ChakraLink
      href={href}
      color="white"
      bg={BRAND_COLORS.blue}
      px={3}
      py={1.5}
      borderRadius="md"
      fontWeight="semibold"
      textDecoration="none"
      _hover={{ bg: '#013a6f', color: 'white' }}
    >
      {label}
    </ChakraLink>
  )
}
