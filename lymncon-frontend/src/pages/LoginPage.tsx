import { useState } from 'react'
import { Box, Heading, Stack, Text, Flex, Icon } from '@chakra-ui/react'
import { ShieldCheck, Lock } from 'lucide-react'
import {
  LymnconButton,
  LymnconCard,
  LymnconInput,
  LymnconCheckbox,
  LymnconRouteLink,
  BRAND_COLORS,
} from '../lymncon_component'
import { AuthLayout } from './AuthLayout'
export function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false)

  const LoginForm = (
    <Box maxW="460px" mx="auto">
      <LymnconCard>
        <Stack gap={4}>
          <Box>
            <Flex justify="space-between" align="flex-start">
              <Stack gap={1}>
                <Heading size="lg" color={BRAND_COLORS.blue} fontWeight="800">Welcome Back</Heading>
                <Text color="gray.500">Secure access to project management.</Text>
              </Stack>
              <Box bg="blue.50" p={2} borderRadius="lg" color={BRAND_COLORS.blue}>
                <Icon as={Lock} boxSize={5} />
              </Box>
            </Flex>
          </Box>

          <Stack gap={4}>
            <LymnconInput placeholder="Email address" type="email" />
            <LymnconInput placeholder="Password" type="password" />
            
            <Flex justify="space-between" align="center">
              <LymnconCheckbox 
                label="Remember me" 
                checked={rememberMe} 
                onCheckedChange={setRememberMe} 
              />
              <LymnconRouteLink to="/forgot-password" label="Forgot Password?" />
            </Flex>
          </Stack>

          <LymnconButton label="Sign In" size="lg" />

          <Box
            p={4}
            bg="gray.50"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.100"
          >
            <Flex align="center" gap={3}>
              <Icon as={ShieldCheck} color="green.500" boxSize={5} />
              <Box>
                <Text fontSize="xs" fontWeight="800" color="gray.400" textTransform="uppercase">
                  Secured Login
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Your credentials are encrypted and protected by industry standards.
                </Text>
              </Box>
            </Flex>
          </Box>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Do not have an account?{' '}
            <LymnconRouteLink to="/signup" label="Create account" />
          </Text>
        </Stack>
      </LymnconCard>
    </Box>
  )

  return <AuthLayout rightContent={LoginForm} />
}
