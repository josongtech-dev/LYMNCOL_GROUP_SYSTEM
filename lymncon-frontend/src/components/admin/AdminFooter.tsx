import { Box, Flex, Text, Link, Icon } from '@chakra-ui/react'
import { ExternalLink } from 'lucide-react'
import { BRAND_COLORS, TYPOGRAPHY } from '../../lymncon_component'
import { useThemeMode } from '../../context/useThemeMode'

export function AdminFooter() {
  const { themeMode } = useThemeMode()
  const isDark = themeMode === 'dark'

  return (
    <Box
      py={{ base: 3, md: 4 }}
      px={{ base: 4, md: 8 }}
    >
      <Flex
        justify="center"
        align="center"
        gap={{ base: 2, md: 1 }}
        wrap="wrap"
        direction={{ base: 'column', sm: 'row' }}
      >
        <Text fontSize={TYPOGRAPHY.caption.size} color={isDark ? 'gray.300' : 'gray.500'} fontWeight="medium" textAlign="center">
          © 2026 LYMNCOL GROUP. All rights reserved.
        </Text>
        <Box w="1px" h="12px" bg={isDark ? 'whiteAlpha.300' : 'gray.200'} mx={2} display={{ base: 'none', sm: 'block' }} />
        <Text fontSize={TYPOGRAPHY.caption.size} color={isDark ? 'gray.300' : 'gray.500'} fontWeight="bold" textAlign="center">
          Powered by{' '}
          <Link 
            href="https://josongtech.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            color={BRAND_COLORS.blue}
            _hover={{ textDecoration: 'underline', color: BRAND_COLORS.gold }}
            display="inline-flex"
            alignItems="center"
            gap={1}
          >
            josongtech <Icon as={ExternalLink} boxSize={3} />
          </Link>
        </Text>
      </Flex>
    </Box>
  )
}
