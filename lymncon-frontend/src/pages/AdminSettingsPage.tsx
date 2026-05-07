import { useState } from 'react'
import { Grid, GridItem, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { Bell, ShieldCheck, SlidersHorizontal, Globe, Save } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import {
  BRAND_COLORS,
  LymnconButton,
  LymnconCard,
  LymnconInput,
  LymnconSelect,
  LymnconSwitch,
} from '../lymncon_component'

export function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    systemName: 'LYMNCOL Admin Control',
    supportEmail: 'support@lymncol-demo.com',
    defaultCountry: 'kenya',
    timezone: 'africa-nairobi',
    maintenanceMode: false,
    allowPublicSignup: true,
    requireTwoFactor: true,
    enableEmailAlerts: true,
    enableSmsAlerts: false,
    weeklyDigest: true,
  })

  const updateSetting = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize="2xl" fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Settings
            </Text>
            <Text color="gray.500" fontSize="sm">
              Configure global platform preferences, security controls, and notification defaults.
            </Text>
          </Stack>
          <LymnconButton
            label="Save Changes"
            size="sm"
            bg={BRAND_COLORS.gold}
            _hover={{ bg: BRAND_COLORS.blue }}
            leftIcon={<Icon as={Save} boxSize={4} />}
          />
        </Flex>
      </Box>

      <Grid templateColumns={{ base: '1fr', xl: '1.3fr 1fr' }} gap={6}>
        <GridItem>
          <Stack gap={6}>
            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={SlidersHorizontal} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>General Configuration</Text>
                </Flex>

                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>System Name</Text>
                    <LymnconInput
                      value={settings.systemName}
                      onChange={(event) => updateSetting('systemName', event.target.value)}
                    />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Support Email</Text>
                    <LymnconInput
                      type="email"
                      value={settings.supportEmail}
                      onChange={(event) => updateSetting('supportEmail', event.target.value)}
                    />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Default Country</Text>
                    <LymnconSelect
                      options={[
                        { label: 'Kenya', value: 'kenya' },
                        { label: 'Tanzania', value: 'tanzania' },
                        { label: 'Uganda', value: 'uganda' },
                        { label: 'Rwanda', value: 'rwanda' },
                      ]}
                      value={settings.defaultCountry}
                      onChange={(event) => updateSetting('defaultCountry', event.target.value)}
                      placeholder="Select country"
                    />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Timezone</Text>
                    <LymnconSelect
                      options={[
                        { label: 'Africa/Nairobi (EAT)', value: 'africa-nairobi' },
                        { label: 'Africa/Dar es Salaam (EAT)', value: 'africa-dar-es-salaam' },
                        { label: 'UTC', value: 'utc' },
                      ]}
                      value={settings.timezone}
                      onChange={(event) => updateSetting('timezone', event.target.value)}
                      placeholder="Select timezone"
                    />
                  </GridItem>
                </Grid>
              </Stack>
            </LymnconCard>

            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={ShieldCheck} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Security & Access</Text>
                </Flex>

                <Stack gap={3}>
                  <LymnconSwitch
                    label="Require Two-Factor Authentication For Admins"
                    checked={settings.requireTwoFactor}
                    onCheckedChange={(checked) => updateSetting('requireTwoFactor', checked)}
                  />
                  <LymnconSwitch
                    label="Allow Public Sign Up Requests"
                    checked={settings.allowPublicSignup}
                    onCheckedChange={(checked) => updateSetting('allowPublicSignup', checked)}
                  />
                  <LymnconSwitch
                    label="Enable Maintenance Mode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                  />
                </Stack>
              </Stack>
            </LymnconCard>
          </Stack>
        </GridItem>

        <GridItem>
          <Stack gap={6}>
            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={Bell} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Notifications</Text>
                </Flex>

                <Stack gap={3}>
                  <LymnconSwitch
                    label="Enable Email Alerts"
                    checked={settings.enableEmailAlerts}
                    onCheckedChange={(checked) => updateSetting('enableEmailAlerts', checked)}
                  />
                  <LymnconSwitch
                    label="Enable SMS Alerts"
                    checked={settings.enableSmsAlerts}
                    onCheckedChange={(checked) => updateSetting('enableSmsAlerts', checked)}
                  />
                  <LymnconSwitch
                    label="Send Weekly Digest Reports"
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) => updateSetting('weeklyDigest', checked)}
                  />
                </Stack>
              </Stack>
            </LymnconCard>

            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={Globe} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Environment</Text>
                </Flex>
                <Text fontSize="sm" color="gray.600">
                  Production Region: East Africa Cluster
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Version: v2.4.0 Stable
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Last Config Sync: 2026-05-01 20:00 EAT
                </Text>
              </Stack>
            </LymnconCard>
          </Stack>
        </GridItem>
      </Grid>
    </AdminDashboardStructure>
  )
}
