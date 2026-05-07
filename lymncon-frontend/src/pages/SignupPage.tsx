import { useState } from 'react'
import { Box, Heading, Stack, Text, Flex, Icon } from '@chakra-ui/react'
import { ShieldCheck, UserPlus } from 'lucide-react'
import {
  LymnconButton,
  LymnconCard,
  LymnconCountrySelect,
  type LymnconCountryOption,
  LymnconInput,
  LymnconRouteLink,
  LymnconSelect,
  LymnconCheckbox,
  BRAND_COLORS,
} from '../lymncon_component'
import { AuthLayout } from './AuthLayout'

const roleOptions = [
  { label: 'Contractor', value: 'contractor' },
  { label: 'Client', value: 'client' },
  { label: 'Financial Team', value: 'financial' },
  { label: 'Legal Team', value: 'legal' },
]

export function SignupPage() {
  const [selectedCountry, setSelectedCountry] = useState<LymnconCountryOption | null>(null)
  const [phone, setPhone] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const updateCountry = (country: LymnconCountryOption | null, dialCode: string) => {
    setSelectedCountry(country)
    if (!country || !dialCode) return
    setPhone((previousPhone) => {
      if (!previousPhone.trim()) return `${dialCode} `
      return previousPhone.replace(/^\+\d+\s?/, `${dialCode} `)
    })
  }

  const SignupForm = (
    <Box maxW="520px" mx="auto">
      <LymnconCard>
        <Stack gap={3}>
          <Box>
            <Flex justify="space-between" align="flex-start">
              <Stack gap={1}>
                <Heading size="lg" color={BRAND_COLORS.blue} fontWeight="800">Request Access</Heading>
                <Text color="gray.500" fontSize="xs">Join the Lymncom Intelligence System.</Text>
              </Stack>
              <Box bg="blue.50" p={2} borderRadius="lg" color={BRAND_COLORS.blue}>
                <Icon as={UserPlus} boxSize={5} />
              </Box>
            </Flex>
          </Box>

          <Stack gap={2}>
            <LymnconSelect
              options={roleOptions}
              placeholder="Select your role"
            />
            <Flex gap={3} direction={{ base: 'column', sm: 'row' }}>
              <LymnconInput placeholder="Full name" />
              <LymnconInput placeholder="Email address" type="email" />
            </Flex>
            <LymnconCountrySelect
              value={selectedCountry}
              onChange={updateCountry}
              placeholder="Select country"
            />
            <LymnconInput
              placeholder="Phone number"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <Flex gap={3} direction={{ base: 'column', sm: 'row' }}>
              <LymnconInput placeholder="Password" type="password" />
              <LymnconInput placeholder="Confirm password" type="password" />
            </Flex>

            <Box pt={1}>
              <LymnconCheckbox 
                label="I accept the terms and conditions" 
                checked={acceptTerms}
                onCheckedChange={setAcceptTerms}
              />
            </Box>
          </Stack>

          <LymnconButton label="Submit Request" size="lg" />

          <Box
            p={3}
            bg="blue.50"
            borderRadius="xl"
            border="1px solid"
            borderColor="blue.100"
          >
            <Flex align="center" gap={3}>
              <Icon as={ShieldCheck} color={BRAND_COLORS.blue} boxSize={5} />
              <Box>
                <Text fontSize="10px" fontWeight="800" color={BRAND_COLORS.blue} textTransform="uppercase">
                  Secured Registration
                </Text>
                <Text fontSize="xs" color="blue.700">
                  One of our team will reach out to complete onboarding and system access.
                </Text>
              </Box>
            </Flex>
          </Box>

          <Text fontSize="xs" color="gray.500" textAlign="center">
            Already have an account?{' '}
            <LymnconRouteLink to="/login" label="Sign In" />
          </Text>
        </Stack>
      </LymnconCard>
    </Box>
  )

  return <AuthLayout rightContent={SignupForm} />
}
