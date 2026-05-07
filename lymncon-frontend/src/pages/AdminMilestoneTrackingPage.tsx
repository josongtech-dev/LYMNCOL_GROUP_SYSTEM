import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon, Badge } from '@chakra-ui/react'
import { Milestone, CheckCircle2, Clock3, AlertTriangle, Search, Filter, Download, Eye, Flag } from 'lucide-react'
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

type MilestoneRecord = {
  id: string
  project: string
  client: string
  stage: string
  dueDate: string
  progress: number
  status: 'Completed' | 'In Progress' | 'Delayed'
}

export function AdminMilestoneTrackingPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: MilestoneRecord[] = useMemo(() => {
    const seed: MilestoneRecord[] = [
      {
        id: 'MLS-001',
        project: 'Westlands Heights',
        client: 'Muriithi Holdings',
        stage: 'Foundation',
        dueDate: '2026-05-20',
        progress: 100,
        status: 'Completed',
      },
      {
        id: 'MLS-002',
        project: 'Ocean View Villas',
        client: 'R&K Estates',
        stage: 'Structural Framing',
        dueDate: '2026-06-02',
        progress: 62,
        status: 'In Progress',
      },
      {
        id: 'MLS-003',
        project: 'Kisumu Business Park',
        client: 'Ngetich Properties',
        stage: 'Electrical Installations',
        dueDate: '2026-05-10',
        progress: 46,
        status: 'Delayed',
      },
    ]

    const statuses: MilestoneRecord['status'][] = ['Completed', 'In Progress', 'Delayed']
    const stages = ['Foundation', 'Framing', 'Roofing', 'Electrical', 'Finishes', 'Handover']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `MLS-${(index + 4).toString().padStart(3, '0')}`,
      project: `Project ${index + 4}`,
      client: `Client Org ${index + 4}`,
      stage: stages[index % stages.length],
      dueDate: `2026-0${(index % 9) + 1}-${String((index % 27) + 1).padStart(2, '0')}`,
      progress: (index * 11) % 101,
      status: statuses[index % statuses.length],
    }))
    return [...seed, ...generated]
  }, [])

  const totalPages = Math.max(1, Math.ceil(records.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedRecords = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage
    return records.slice(start, start + itemsPerPage)
  }, [itemsPerPage, records, safePage])

  const rows = paginatedRecords.map((record, index) => {
    const statusColorMap: Record<MilestoneRecord['status'], string> = {
      Completed: 'green',
      'In Progress': 'blue',
      Delayed: 'red',
    }
    const progressColor = record.status === 'Completed' ? BRAND_COLORS.blue : record.status === 'Delayed' ? BRAND_COLORS.red : BRAND_COLORS.gold

    return [
      <Stack key={`project-${index}`} gap={0} minW="160px">
        <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="xs">{record.project}</Text>
        <Text fontSize="10px" color="gray.500">{record.id}</Text>
      </Stack>,
      <Text key={`client-${index}`} fontSize="xs" color="gray.700" minW="150px">{record.client}</Text>,
      <Text key={`stage-${index}`} fontSize="xs" color="gray.700" minW="140px">{record.stage}</Text>,
      <Text key={`dueDate-${index}`} fontSize="xs" color="gray.700">{record.dueDate}</Text>,
      <Stack key={`progress-${index}`} gap={1.5} minW="150px">
        <Text fontSize="xs" fontWeight="700" color={BRAND_COLORS.blue}>{record.progress}%</Text>
        <Box h="6px" bg="#E6EDF4" borderRadius="full" overflow="hidden">
          <Box h="100%" w={`${record.progress}%`} bg={progressColor} borderRadius="full" />
        </Box>
      </Stack>,
      <Badge key={`status-${index}`} colorPalette={statusColorMap[record.status]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.status}
      </Badge>,
      <Flex key={`actions-${index}`} gap={2} align="center">
        <LymnconButton label="Track" size="xs" variant="outline" leftIcon={<Icon as={Eye} boxSize={3} />} />
        <LymnconButton label="Flag" size="xs" variant="ghost" leftIcon={<Icon as={Flag} boxSize={3} />} />
      </Flex>,
    ]
  })

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize="2xl" fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Milestone Tracking
            </Text>
            <Text color="gray.500" fontSize="sm">
              Track completion stages, pending approvals, and payout readiness per project milestone.
            </Text>
          </Stack>
          <LymnconButton
            label="Export Milestone Log"
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
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Total Milestones</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>3,018</Text>
            </Box>
            <Box p={3} bg="blue.50" color="blue.500" borderRadius="xl"><Icon as={Milestone} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Completed</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>1,982</Text>
            </Box>
            <Box p={3} bg="green.50" color="green.500" borderRadius="xl"><Icon as={CheckCircle2} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">In Progress</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>821</Text>
            </Box>
            <Box p={3} bg="orange.50" color="orange.500" borderRadius="xl"><Icon as={Clock3} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Delayed</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>215</Text>
            </Box>
            <Box p={3} bg="red.50" color="red.500" borderRadius="xl"><Icon as={AlertTriangle} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              Milestone Queue
            </Text>
            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput placeholder="Search milestone..." pl={9} size="sm" w={{ base: '100%', md: '280px' }} />
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
            columns={['Project', 'Client', 'Stage', 'Due Date', 'Progress', 'Status', 'Actions']}
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
