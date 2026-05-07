import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { BRAND_COLORS, LymnconButton } from '../lymncon_component'
import { Link as RouterLink } from 'react-router-dom'
import heroImg from '../assets/hero-realistic.png'
import { AuthLayout } from './AuthLayout'

export function LandingPage() {
  const LandingVisual = (
    <Box position="relative" w="100%" maxW="600px" mx="auto">
      {/* Decorative frame */}
      <Box
        position="absolute"
        top="-10px"
        left="-10px"
        right="10px"
        bottom="10px"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="2xl"
        zIndex={0}
      />
      <Image
        src={heroImg}
        alt="Professional Construction Management"
        borderRadius="xl"
        boxShadow="2xl"
        position="relative"
        zIndex={1}
        w="100%"
        maxH="320px"
        objectFit="cover"
      />
      
      {/* Integrated Status Badge */}
      <Box
        position="absolute"
        bottom="15px"
        right="15px"
        bg="white"
        px={4}
        py={2}
        borderRadius="lg"
        boxShadow="lg"
        zIndex={2}
        border="1px solid"
        borderColor="gray.50"
      >
        <Flex align="center" gap={2}>
          <Box boxSize={2} bg="green.400" borderRadius="full" />
          <Text fontSize="xs" fontWeight="bold" color={BRAND_COLORS.blue}>
            Operational in Kenya
          </Text>
        </Flex>
      </Box>

      <Box position="absolute" top="15px" left="15px" zIndex={2}>
        <Stack gap={2}>
          <RouterLink to="/admin/overview">
            <LymnconButton label="Open Admin Dashboard Sample" size="sm" />
          </RouterLink>
        </Stack>
      </Box>
    </Box>
  )

  return <AuthLayout rightContent={LandingVisual} />
}
