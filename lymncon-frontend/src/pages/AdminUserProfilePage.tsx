import { useState } from 'react'
import { Grid, GridItem, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { UserCircle, Mail, ShieldCheck, Save, KeyRound } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import {
  BRAND_COLORS,
  LymnconButton,
  LymnconCard,
  LymnconInput,
  LymnconSelect,
  LymnconSwitch,
} from '../lymncon_component'

export function AdminUserProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'LYMNCOL Admin Controller',
    email: 'admin@lymncol-demo.com',
    phone: '+254 700 123 456',
    role: 'Super Admin',
    department: 'Platform Operations',
    timezone: 'africa-nairobi',
    enable2FA: true,
    emailNotifications: true,
    sessionAlerts: true,
  })

  const updateProfile = <K extends keyof typeof profile>(key: K, value: (typeof profile)[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize="2xl" fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              User Profile
            </Text>
            <Text color="gray.500" fontSize="sm">
              Manage your account identity, access security, and notification preferences.
            </Text>
          </Stack>
          <LymnconButton
            label="Save Profile"
            size="sm"
            bg={BRAND_COLORS.gold}
            _hover={{ bg: BRAND_COLORS.blue }}
            leftIcon={<Icon as={Save} boxSize={4} />}
          />
        </Flex>
      </Box>

      <Grid templateColumns={{ base: '1fr', xl: '1.2fr 1fr' }} gap={6}>
        <GridItem>
          <Stack gap={6}>
            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={UserCircle} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Account Information</Text>
                </Flex>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Full Name</Text>
                    <LymnconInput value={profile.fullName} onChange={(e) => updateProfile('fullName', e.target.value)} />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Email Address</Text>
                    <LymnconInput type="email" value={profile.email} onChange={(e) => updateProfile('email', e.target.value)} />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Phone Number</Text>
                    <LymnconInput value={profile.phone} onChange={(e) => updateProfile('phone', e.target.value)} />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Timezone</Text>
                    <LymnconSelect
                      options={[
                        { label: 'Africa/Nairobi (EAT)', value: 'africa-nairobi' },
                        { label: 'UTC', value: 'utc' },
                        { label: 'Africa/Dar es Salaam (EAT)', value: 'africa-dar-es-salaam' },
                      ]}
                      value={profile.timezone}
                      onChange={(e) => updateProfile('timezone', e.target.value)}
                    />
                  </GridItem>
                </Grid>
              </Stack>
            </LymnconCard>

            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={Mail} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Role & Department</Text>
                </Flex>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Role</Text>
                    <LymnconSelect
                      options={[
                        { label: 'Super Admin', value: 'Super Admin' },
                        { label: 'Operations Admin', value: 'Operations Admin' },
                        { label: 'Compliance Admin', value: 'Compliance Admin' },
                      ]}
                      value={profile.role}
                      onChange={(e) => updateProfile('role', e.target.value)}
                    />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Department</Text>
                    <LymnconSelect
                      options={[
                        { label: 'Platform Operations', value: 'Platform Operations' },
                        { label: 'Security & Compliance', value: 'Security & Compliance' },
                        { label: 'Finance Control', value: 'Finance Control' },
                      ]}
                      value={profile.department}
                      onChange={(e) => updateProfile('department', e.target.value)}
                    />
                  </GridItem>
                </Grid>
              </Stack>
            </LymnconCard>
          </Stack>
        </GridItem>

        <GridItem>
          <Stack gap={6}>
            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={ShieldCheck} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Security Preferences</Text>
                </Flex>
                <LymnconSwitch
                  label="Enable Two-Factor Authentication"
                  checked={profile.enable2FA}
                  onCheckedChange={(v) => updateProfile('enable2FA', v)}
                />
                <LymnconSwitch
                  label="Email Notifications"
                  checked={profile.emailNotifications}
                  onCheckedChange={(v) => updateProfile('emailNotifications', v)}
                />
                <LymnconSwitch
                  label="Session Activity Alerts"
                  checked={profile.sessionAlerts}
                  onCheckedChange={(v) => updateProfile('sessionAlerts', v)}
                />
              </Stack>
            </LymnconCard>

            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={KeyRound} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Credentials</Text>
                </Flex>
                <LymnconButton label="Reset Password" variant="outline" size="sm" />
                <Text fontSize="sm" color="gray.600">
                  Last password update: 2026-04-21
                </Text>
              </Stack>
            </LymnconCard>
          </Stack>
        </GridItem>
      </Grid>
    </AdminDashboardStructure>
  )
}
