import { useState } from 'react'
import { Grid, GridItem, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { LayoutGrid, Workflow, Users, Save } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import {
  BRAND_COLORS,
  LymnconButton,
  LymnconCard,
  LymnconInput,
  LymnconSelect,
  LymnconSwitch,
} from '../lymncon_component'

export function AdminPortalSettingsPage() {
  const [settings, setSettings] = useState({
    portalName: 'LYMNCOL Contractor Portal',
    welcomeMessage: 'Welcome to LYMNCOL project workspace',
    defaultWorkflow: 'standard',
    defaultLandingModule: 'overview',
    showFinanceModule: true,
    showLegalModule: true,
    showProjectsModule: true,
    showHelpDeskModule: true,
    allowClientSelfOnboarding: true,
    requireAdminApproval: true,
    enableModuleAuditTrail: true,
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
              Portal Settings
            </Text>
            <Text color="gray.500" fontSize="sm">
              Control module visibility, workflow defaults, and governance behavior for the portal.
            </Text>
          </Stack>
          <LymnconButton
            label="Save Portal Configuration"
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
                  <Icon as={LayoutGrid} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Portal Identity</Text>
                </Flex>

                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Portal Name</Text>
                    <LymnconInput
                      value={settings.portalName}
                      onChange={(event) => updateSetting('portalName', event.target.value)}
                    />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Welcome Message</Text>
                    <LymnconInput
                      value={settings.welcomeMessage}
                      onChange={(event) => updateSetting('welcomeMessage', event.target.value)}
                    />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Default Workflow</Text>
                    <LymnconSelect
                      options={[
                        { label: 'Standard', value: 'standard' },
                        { label: 'Strict Compliance', value: 'strict-compliance' },
                        { label: 'Fast-Track Delivery', value: 'fast-track' },
                      ]}
                      value={settings.defaultWorkflow}
                      onChange={(event) => updateSetting('defaultWorkflow', event.target.value)}
                    />
                  </GridItem>
                  <GridItem>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1}>Default Landing Module</Text>
                    <LymnconSelect
                      options={[
                        { label: 'Overview', value: 'overview' },
                        { label: 'Projects', value: 'projects' },
                        { label: 'Clients', value: 'clients' },
                        { label: 'Analytics', value: 'analytics' },
                      ]}
                      value={settings.defaultLandingModule}
                      onChange={(event) => updateSetting('defaultLandingModule', event.target.value)}
                    />
                  </GridItem>
                </Grid>
              </Stack>
            </LymnconCard>

            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={Workflow} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Module Visibility</Text>
                </Flex>

                <Stack gap={3}>
                  <LymnconSwitch label="Show Finance Module" checked={settings.showFinanceModule} onCheckedChange={(v) => updateSetting('showFinanceModule', v)} />
                  <LymnconSwitch label="Show Legal Module" checked={settings.showLegalModule} onCheckedChange={(v) => updateSetting('showLegalModule', v)} />
                  <LymnconSwitch label="Show Projects Module" checked={settings.showProjectsModule} onCheckedChange={(v) => updateSetting('showProjectsModule', v)} />
                  <LymnconSwitch label="Show Help Desk Module" checked={settings.showHelpDeskModule} onCheckedChange={(v) => updateSetting('showHelpDeskModule', v)} />
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
                  <Icon as={Users} color={BRAND_COLORS.blue} boxSize={5} />
                  <Text fontWeight="bold" color={BRAND_COLORS.blue}>Onboarding & Governance</Text>
                </Flex>

                <Stack gap={3}>
                  <LymnconSwitch
                    label="Allow Client Self-Onboarding"
                    checked={settings.allowClientSelfOnboarding}
                    onCheckedChange={(v) => updateSetting('allowClientSelfOnboarding', v)}
                  />
                  <LymnconSwitch
                    label="Require Admin Approval For New Profiles"
                    checked={settings.requireAdminApproval}
                    onCheckedChange={(v) => updateSetting('requireAdminApproval', v)}
                  />
                  <LymnconSwitch
                    label="Enable Module Audit Trail"
                    checked={settings.enableModuleAuditTrail}
                    onCheckedChange={(v) => updateSetting('enableModuleAuditTrail', v)}
                  />
                </Stack>
              </Stack>
            </LymnconCard>

            <LymnconCard variant="simple">
              <Stack gap={4}>
                <Text fontWeight="bold" color={BRAND_COLORS.blue}>Configuration Summary</Text>
                <Text fontSize="sm" color="gray.600">
                  Active modules and workflow defaults are applied across all admin users after saving.
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Last portal policy sync: 2026-05-01 21:10 EAT
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Current environment: Production Cluster (East Africa)
                </Text>
              </Stack>
            </LymnconCard>
          </Stack>
        </GridItem>
      </Grid>
    </AdminDashboardStructure>
  )
}
