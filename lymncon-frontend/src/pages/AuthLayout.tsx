import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  Flex,
  Button,
  Badge,
  Link,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  CheckCircle2,
  ShieldCheck,
  CheckCircle,
  Home,
  UserPlus,
  LogIn,
  Download,
  Monitor,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BRAND_COLORS, TYPOGRAPHY } from '../lymncon_component/brand'

const benefits = [
  {
    title: 'Direct Transparency',
    desc: 'Eliminate intermediaries with direct collaboration.',
  },
  {
    title: 'Financial Integrity',
    desc: 'Escrow-protected phased releases.',
  },
  {
    title: 'Site Intelligence',
    desc: 'Real-time GPS validation and site oversight.',
  },
  {
    title: 'Operational Excellence',
    desc: 'Unified workflows for all project teams.',
  },
]

const SecureBadge = ({ icon, label, sublabel }: { icon: LucideIcon, label: string, sublabel: string }) => (
  <Flex
    bg="white/80"
    backdropFilter="blur(8px)"
    p={3}
    px={5}
    borderRadius="xl"
    boxShadow="lg"
    border="1px solid"
    borderColor="white/20"
    align="center"
    gap={4}
  >
    <Box
      bg="green.50"
      p={2}
      borderRadius="full"
      color="green.500"
    >
      <Icon as={icon} boxSize={5} />
    </Box>
    <Box>
      <Text 
        fontSize={TYPOGRAPHY.captionBold.size} 
        fontWeight={TYPOGRAPHY.captionBold.weight} 
        color="gray.400" 
        textTransform="uppercase" 
        mb={0.5}
      >
        {label}
      </Text>
      <Text 
        fontSize={TYPOGRAPHY.bodyBold.size} 
        fontWeight={TYPOGRAPHY.bodyBold.weight} 
        color={BRAND_COLORS.blue}
      >
        {sublabel}
      </Text>
    </Box>
  </Flex>
)

export function AuthLayout({ rightContent }: { rightContent: React.ReactNode }) {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const isLogin = location.pathname === '/login'
  const isSignup = location.pathname === '/signup'

  return (
    <Box
      minH="100dvh"
      w="100vw"
      color={BRAND_COLORS.text}
      overflowX="hidden"
      overflowY="auto"
      position="relative"
      bg="#F1F5F9"
    >
      {/* Dynamic Background Pattern */}
      <Box 
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex={0}
        opacity={0.05}
        pointerEvents="none"
        backgroundImage="radial-gradient(#014A8D 0.5px, transparent 0.5px)"
        backgroundSize="24px 24px"
      />

      <Flex direction="column" minH="100dvh" position="relative" zIndex={1} overflow="hidden">
        {/* Dynamic Header */}
        <Box borderBottom="1px solid" borderColor="blackAlpha.50" bg="white/40" backdropFilter="blur(12px)">
          <Container maxW="container.xl" py={3}>
            <Flex justify="space-between" align="center" gap={2}>
              <RouterLink to="/">
                <Heading size={{ base: 'sm', md: 'md' }} color={BRAND_COLORS.blue} fontWeight="800" letterSpacing="-0.02em" whiteSpace="nowrap">
                  LYMNCOL <Text as="span" color={BRAND_COLORS.gold}>GROUP</Text>
                </Heading>
              </RouterLink>

              <Flex gap={{ base: 1, md: 4 }} align="center" flexShrink={0}>
                {!isLanding && (
                  <RouterLink to="/">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      color="gray.600" 
                      _hover={{ bg: 'white/50' }}
                      _focusVisible={{ outline: 'none', boxShadow: `0 0 0 2px ${BRAND_COLORS.blue}` }}
                      px={{ base: 2, md: 3 }}
                    >
                      <Icon as={Home} boxSize={4} />
                      <Text as="span" display={{ base: 'none', md: 'inline' }} ml={2}>Home</Text>
                    </Button>
                  </RouterLink>
                )}
                
                {!isLogin && (
                  <RouterLink to="/login">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      color={BRAND_COLORS.blue} 
                      _hover={{ bg: 'white/50' }}
                      _focusVisible={{ outline: 'none', boxShadow: `0 0 0 2px ${BRAND_COLORS.blue}` }}
                      px={{ base: 2, md: 3 }}
                    >
                      <Icon as={LogIn} boxSize={4} />
                      <Text as="span" display={{ base: 'none', md: 'inline' }} ml={2}>Sign In</Text>
                    </Button>
                  </RouterLink>
                )}

                {!isSignup && (
                  <RouterLink to="/signup">
                    <Button 
                      bg={BRAND_COLORS.blue} 
                      color="white" 
                      size="sm" 
                      px={{ base: 3, md: 6 }}
                      _hover={{ bg: '#013a6f' }}
                      _focusVisible={{ outline: 'none', boxShadow: `0 0 0 2px white, 0 0 0 4px ${BRAND_COLORS.blue}` }}
                    >
                      <Icon as={UserPlus} boxSize={4} />
                      <Text as="span" display={{ base: 'none', sm: 'inline' }} ml={2}>Request Access</Text>
                    </Button>
                  </RouterLink>
                )}
              </Flex>
            </Flex>
          </Container>
        </Box>

        {/* Main Content Area */}
        <Flex flex={1} align="center" py={{ base: 6, lg: 0 }}>
          <Container maxW="container.xl" px={{ base: 4, md: 6, xl: 8 }}>
            <Flex direction={{ base: 'column', lg: 'row' }} align={{ base: 'stretch', lg: 'center' }} gap={{ base: 8, lg: 12 }}>
              {/* Left Side: Content */}
              <Stack flex={1.1} gap={10}>
                <Stack gap={4}>
                  <Box bg={BRAND_COLORS.gold} h="2px" w="60px" />
                  <Heading
                    as="h1"
                    fontSize={{ base: '2xl', md: TYPOGRAPHY.h1.size }}
                    lineHeight="1.1"
                    fontWeight={TYPOGRAPHY.h1.weight}
                    color={BRAND_COLORS.blue}
                    letterSpacing="-0.03em"
                  >
                    Intelligence for Modern Construction
                  </Heading>
                  <Text 
                    fontSize={TYPOGRAPHY.body.size} 
                    color="gray.600" 
                    maxW="450px" 
                    lineHeight="1.5"
                  >
                    Professional-grade system designed to eliminate project uncertainty and secure capital.
                  </Text>
                </Stack>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 4, md: 8 }}>
                  {benefits.map((benefit) => (
                    <Flex key={benefit.title} align="flex-start" gap={3}>
                      <Icon as={CheckCircle2} color={BRAND_COLORS.gold} boxSize={5} mt={1} flexShrink={0} />
                      <Box minW={0}>
                        <Text 
                          fontWeight={TYPOGRAPHY.bodyBold.weight} 
                          color={BRAND_COLORS.blue} 
                          fontSize={TYPOGRAPHY.body.size}
                        >
                          {benefit.title}
                        </Text>
                        <Text color="gray.500" fontSize={TYPOGRAPHY.caption.size} lineHeight="1.4">
                          {benefit.desc}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </SimpleGrid>

                <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 3, sm: 6 }} pt={4} wrap="wrap">
                  <SecureBadge icon={ShieldCheck} label="Security" sublabel="256-Bit Secure" />
                  <SecureBadge icon={CheckCircle} label="Trust" sublabel="Verified System" />
                </Flex>

                <Flex direction="row" gap={3} pt={4} wrap="wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    borderRadius="full"
                    bg="white/50"
                    borderColor={BRAND_COLORS.blue}
                    color={BRAND_COLORS.blue}
                    _hover={{ bg: 'white/80' }}
                    _focusVisible={{ outline: 'none', boxShadow: `0 0 0 2px ${BRAND_COLORS.blue}` }}
                  >
                    <Icon as={Download} mr={2} boxSize={4} /> Mobile App
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    borderRadius="full"
                    bg="white/50"
                    borderColor={BRAND_COLORS.blue}
                    color={BRAND_COLORS.blue}
                    _hover={{ bg: 'white/80' }}
                    _focusVisible={{ outline: 'none', boxShadow: `0 0 0 2px ${BRAND_COLORS.blue}` }}
                  >
                    <Icon as={Monitor} mr={2} boxSize={4} /> Desktop App
                  </Button>
                </Flex>
              </Stack>

              {/* Right Side: Form or Image */}
              <Box flex={0.9} w="100%" minW={0}>
                {rightContent}
              </Box>
            </Flex>
          </Container>
        </Flex>

        {/* Footer */}
        <Box borderTop="1px solid" borderColor="blackAlpha.50" py={3} bg="white/30" backdropFilter="blur(8px)">
          <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
            <Stack gap={3}>
              <Flex justify="center" gap={{ base: 2, md: 4 }} wrap="wrap">
                <Badge variant="subtle" colorScheme="blue" px={{ base: 2, md: 4 }} py={1} borderRadius="full" fontSize={TYPOGRAPHY.captionBold.size} fontWeight="bold">
                  TRANSPARENCY
                </Badge>
                <Badge variant="subtle" colorScheme="yellow" px={{ base: 2, md: 4 }} py={1} borderRadius="full" fontSize={TYPOGRAPHY.captionBold.size} fontWeight="bold">
                  INTELLIGENCE
                </Badge>
                <Badge variant="subtle" colorScheme="green" px={{ base: 2, md: 4 }} py={1} borderRadius="full" fontSize={TYPOGRAPHY.captionBold.size} fontWeight="bold">
                  TRUST
                </Badge>
              </Flex>

              <Stack gap={0} textAlign="center" mb={1}>
                <Text fontSize={TYPOGRAPHY.caption.size} color="gray.500" fontWeight="bold">
                  © 2026 LYMNCOL GROUP. All rights reserved.
                </Text>
                <Text fontSize="10px" color="gray.400" fontWeight="medium">
                  Developed by{' '}
                  <Link 
                    href="https://josongtech.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    color={BRAND_COLORS.blue} 
                    fontWeight="bold" 
                    _hover={{ textDecoration: 'underline' }}
                    _focusVisible={{ outline: 'none', textDecoration: 'underline', color: BRAND_COLORS.gold }}
                  >
                    josongtech ai agency
                  </Link>
                  {' '}— eliminating inefficiency through intelligence automation.
                </Text>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Flex>
    </Box>
  )
}
