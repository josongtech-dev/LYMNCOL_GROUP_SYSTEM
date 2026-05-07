import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon, Grid, GridItem, Badge } from '@chakra-ui/react'
import { ShieldCheck, AlertTriangle, Lock, UserCheck, Search, Filter, Download } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import {
  BRAND_COLORS,
  LymnconButton,
  LymnconCard,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
  LymnconSwitch,
  LymnconTable,
} from '../lymncon_component'

type SecurityEvent = {
  timestamp: string
  event: string
  actor: string
  source: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
}

export function AdminSecurityPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [controls, setControls] = useState({
    enforce2FA: true,
    blockSuspiciousLogins: true,
    notifyOnCritical: true,
    sessionTimeout: true,
  })

  const events: SecurityEvent[] = useMemo(() => {
    const seed: SecurityEvent[] = [
      {
        timestamp: 'Today 20:12',
        event: 'Blocked login attempt (invalid geolocation)',
        actor: 'System Guard',
        source: 'Web Portal',
        severity: 'High',
      },
      {
        timestamp: 'Today 19:55',
        event: 'Two-factor challenge passed',
        actor: 'Finance Admin',
        source: 'Admin Console',
        severity: 'Low',
      },
      {
        timestamp: 'Today 19:22',
        event: 'Account lock triggered after failed attempts',
        actor: 'System Guard',
        source: 'Admin Console',
        severity: 'Critical',
      },
    ]

    const severities: SecurityEvent['severity'][] = ['Low', 'Medium', 'High', 'Critical']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      timestamp: `${(index % 28) + 1} Apr 2026`,
      event: `Security event log ${index + 4}`,
      actor: `User ${index + 4}`,
      source: index % 2 === 0 ? 'Admin Console' : 'Web Portal',
      severity: severities[index % severities.length],
    }))
    return [...seed, ...generated]
  }, [])

  const totalPages = Math.max(1, Math.ceil(events.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedEvents = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage
    return events.slice(start, start + itemsPerPage)
  }, [itemsPerPage, events, safePage])

  const eventRows = paginatedEvents.map((entry, index) => {
    const colorMap: Record<SecurityEvent['severity'], string> = {
      Low: 'green',
      Medium: 'blue',
      High: 'orange',
      Critical: 'red',
    }
    return [
      <Text key={`time-${index}`} fontSize="xs" color="gray.700">{entry.timestamp}</Text>,
      <Text key={`event-${index}`} fontSize="xs" color="gray.700" minW="250px">{entry.event}</Text>,
      <Text key={`actor-${index}`} fontSize="xs" fontWeight="600" color={BRAND_COLORS.blue}>{entry.actor}</Text>,
      <Text key={`source-${index}`} fontSize="xs" color="gray.700">{entry.source}</Text>,
      <Badge key={`severity-${index}`} colorPalette={colorMap[entry.severity]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {entry.severity}
      </Badge>,
    ]
  })

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize="2xl" fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Security
            </Text>
            <Text color="gray.500" fontSize="sm">
              Manage access controls, risk alerts, and security events across the platform.
            </Text>
          </Stack>
          <LymnconButton
            label="Export Security Log"
            variant="outline"
            size="sm"
            leftIcon={<Icon as={Download} boxSize={4} />}
          />
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Security Score</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>94%</Text>
            </Box>
            <Box p={3} bg="green.50" color="green.500" borderRadius="xl"><Icon as={ShieldCheck} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Open Alerts</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>17</Text>
            </Box>
            <Box p={3} bg="orange.50" color="orange.500" borderRadius="xl"><Icon as={AlertTriangle} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Protected Sessions</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>1,284</Text>
            </Box>
            <Box p={3} bg="blue.50" color="blue.500" borderRadius="xl"><Icon as={Lock} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Verified Admins</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>86</Text>
            </Box>
            <Box p={3} bg="purple.50" color="purple.500" borderRadius="xl"><Icon as={UserCheck} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', xl: '1fr 1.5fr' }} gap={6}>
        <GridItem>
          <LymnconCard>
            <Stack gap={4}>
              <Text fontWeight="bold" color={BRAND_COLORS.blue}>Security Controls</Text>
              <LymnconSwitch label="Enforce Two-Factor Authentication" checked={controls.enforce2FA} onCheckedChange={(v) => setControls((p) => ({ ...p, enforce2FA: v }))} />
              <LymnconSwitch label="Block Suspicious Login Patterns" checked={controls.blockSuspiciousLogins} onCheckedChange={(v) => setControls((p) => ({ ...p, blockSuspiciousLogins: v }))} />
              <LymnconSwitch label="Notify On Critical Security Events" checked={controls.notifyOnCritical} onCheckedChange={(v) => setControls((p) => ({ ...p, notifyOnCritical: v }))} />
              <LymnconSwitch label="Automatic Session Timeout" checked={controls.sessionTimeout} onCheckedChange={(v) => setControls((p) => ({ ...p, sessionTimeout: v }))} />
            </Stack>
          </LymnconCard>
        </GridItem>

        <GridItem>
          <LymnconCard>
            <Stack gap={5}>
              <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
                  Security Event Log
                </Text>
                <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
                  <Box position="relative" flex={1}>
                    <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                      <Icon as={Search} boxSize={4} />
                    </Box>
                    <LymnconInput placeholder="Search security events..." pl={9} size="sm" w={{ base: '100%', md: '260px' }} />
                  </Box>
                  <LymnconButton label="Filter" variant="outline" size="sm" leftIcon={<Icon as={Filter} boxSize={4} />} />
                </Flex>
              </Flex>

              <LymnconRowsPerPageSelect
                value={itemsPerPage}
                onChange={(size) => {
                  setItemsPerPage(size)
                  setCurrentPage(1)
                }}
                options={[15, 25, 35, 50, 100]}
              />

              <LymnconTable
                columns={['Timestamp', 'Event', 'Actor', 'Source', 'Severity']}
                rows={eventRows}
              />

              <LymnconPagination
                totalItems={events.length}
                currentPage={safePage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(size) => {
                  setItemsPerPage(size)
                  setCurrentPage(1)
                }}
                pageSizeOptions={[15, 25, 35, 50, 100]}
                showPageSizeSelector={false}
              />
            </Stack>
          </LymnconCard>
        </GridItem>
      </Grid>
    </AdminDashboardStructure>
  )
}
