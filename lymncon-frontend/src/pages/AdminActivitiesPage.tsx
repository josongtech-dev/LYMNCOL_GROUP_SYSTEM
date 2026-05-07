import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon, Badge } from '@chakra-ui/react'
import { Activity, AlertTriangle, CheckCircle2, Clock3, Search, Filter, Download } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import {
  BRAND_COLORS,
  LymnconButton,
  LymnconCard,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
  LymnconTable,
} from '../lymncon_component'

type ActivityRecord = {
  id: string
  timestamp: string
  actor: string
  module: string
  action: string
  level: 'Info' | 'Warning' | 'Critical'
}

export function AdminActivitiesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: ActivityRecord[] = useMemo(() => {
    const seed: ActivityRecord[] = [
      {
        id: 'ACT-001',
        timestamp: 'Today 20:45',
        actor: 'Finance Admin',
        module: 'Escrow Releases',
        action: 'Approved milestone disbursement for PRJ-042',
        level: 'Info',
      },
      {
        id: 'ACT-002',
        timestamp: 'Today 20:30',
        actor: 'System',
        module: 'Security',
        action: 'Suspicious login attempt blocked',
        level: 'Warning',
      },
      {
        id: 'ACT-003',
        timestamp: 'Today 20:10',
        actor: 'Legal Officer',
        module: 'Compliance & Audits',
        action: 'Marked policy exception as resolved',
        level: 'Info',
      },
    ]

    const modules = ['Projects', 'Clients', 'Finance', 'Security', 'Help Desk', 'Legal Team']
    const levels: ActivityRecord['level'][] = ['Info', 'Warning', 'Critical']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `ACT-${(index + 4).toString().padStart(3, '0')}`,
      timestamp: `${(index % 28) + 1} Apr 2026`,
      actor: `User ${index + 4}`,
      module: modules[index % modules.length],
      action: `Performed activity event ${index + 4}`,
      level: levels[index % levels.length],
    }))

    return [...seed, ...generated]
  }, [])

  const totalPages = Math.max(1, Math.ceil(records.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedRecords = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage
    return records.slice(start, start + itemsPerPage)
  }, [itemsPerPage, records, safePage])

  const stats = [
    { label: 'Total Events', value: '9,860', icon: Activity, color: 'blue' },
    { label: 'Info Events', value: '8,214', icon: CheckCircle2, color: 'green' },
    { label: 'Warnings', value: '1,426', icon: AlertTriangle, color: 'orange' },
    { label: 'Critical', value: '220', icon: Clock3, color: 'red' },
  ]

  const rows = paginatedRecords.map((record) => {
    const levelColorMap: Record<ActivityRecord['level'], string> = {
      Info: 'green',
      Warning: 'orange',
      Critical: 'red',
    }

    return [
      <Text key={`${record.id}-time`} fontSize="xs" color="gray.700">{record.timestamp}</Text>,
      <Text key={`${record.id}-actor`} fontSize="xs" fontWeight="600" color={BRAND_COLORS.blue}>{record.actor}</Text>,
      <Badge key={`${record.id}-module`} variant="outline" colorPalette="blue" size="sm" fontSize="10px">{record.module}</Badge>,
      <Text key={`${record.id}-action`} fontSize="xs" color="gray.700" minW="250px">{record.action}</Text>,
      <Badge key={`${record.id}-level`} colorPalette={levelColorMap[record.level]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.level}
      </Badge>,
    ]
  })

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize="2xl" fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Activities
            </Text>
            <Text color="gray.500" fontSize="sm">
              Audit platform-wide events, operational logs, and user actions in one timeline.
            </Text>
          </Stack>
          <LymnconButton
            label="Export Activity Log"
            variant="outline"
            size="sm"
            leftIcon={<Icon as={Download} boxSize={4} />}
          />
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
        {stats.map((stat) => (
          <LymnconCard key={stat.label} variant="simple" py={4} px={5}>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="wider">
                  {stat.label}
                </Text>
                <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>
                  {stat.value}
                </Text>
              </Box>
              <Box p={3} bg={`${stat.color}.50`} color={`${stat.color}.500`} borderRadius="xl">
                <Icon as={stat.icon} boxSize={6} />
              </Box>
            </Flex>
          </LymnconCard>
        ))}
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              Activity Log
            </Text>

            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput
                  placeholder="Search activities..."
                  pl={9}
                  size="sm"
                  w={{ base: '100%', md: '280px' }}
                />
              </Box>
              <LymnconButton
                label="Filter"
                variant="outline"
                size="sm"
                leftIcon={<Icon as={Filter} boxSize={4} />}
              />
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
            columns={['Timestamp', 'Actor', 'Module', 'Action', 'Level']}
            rows={rows}
          />

          <LymnconPagination
            totalItems={records.length}
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
    </AdminDashboardStructure>
  )
}
