import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon, Badge } from '@chakra-ui/react'
import { HandCoins, CheckCircle2, Clock3, AlertTriangle, Search, Filter, Download, Eye, Flag } from 'lucide-react'
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

type EscrowReleaseRecord = {
  id: string
  project: string
  client: string
  contractor: string
  amount: string
  milestone: string
  status: 'Approved' | 'Pending' | 'Flagged'
  requestedAt: string
}

export function AdminEscrowReleasesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: EscrowReleaseRecord[] = useMemo(() => {
    const seed: EscrowReleaseRecord[] = [
      {
        id: 'ESC-001',
        project: 'Westlands Heights',
        client: 'Muriithi Holdings',
        contractor: 'Build-It Construction Ltd',
        amount: '$28,000',
        milestone: 'Foundation Complete',
        status: 'Approved',
        requestedAt: 'Today 16:20',
      },
      {
        id: 'ESC-002',
        project: 'Ocean View Villas',
        client: 'R&K Estates',
        contractor: 'Apex Civil Works',
        amount: '$14,500',
        milestone: 'Plumbing Stage',
        status: 'Pending',
        requestedAt: 'Today 15:40',
      },
      {
        id: 'ESC-003',
        project: 'Kisumu Business Park',
        client: 'Ngetich Properties',
        contractor: 'UrbanCore Contractors',
        amount: '$35,700',
        milestone: 'Steel Frame Check',
        status: 'Flagged',
        requestedAt: 'Today 14:58',
      },
    ]

    const statuses: EscrowReleaseRecord['status'][] = ['Approved', 'Pending', 'Flagged']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `ESC-${(index + 4).toString().padStart(3, '0')}`,
      project: `Project ${index + 4}`,
      client: `Client Org ${index + 4}`,
      contractor: `Contractor ${index + 4}`,
      amount: `$${(12000 + index * 140).toLocaleString()}`,
      milestone: `Milestone ${(index % 7) + 1}`,
      status: statuses[index % statuses.length],
      requestedAt: `${(index % 28) + 1} Apr 2026`,
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
    const statusColorMap: Record<EscrowReleaseRecord['status'], string> = {
      Approved: 'green',
      Pending: 'orange',
      Flagged: 'red',
    }
    return [
      <Stack key={`project-${index}`} gap={0} minW="160px">
        <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="xs">{record.project}</Text>
        <Text fontSize="10px" color="gray.500">{record.id}</Text>
      </Stack>,
      <Text key={`client-${index}`} fontSize="xs" color="gray.700" minW="150px">{record.client}</Text>,
      <Text key={`contractor-${index}`} fontSize="xs" color="gray.700" minW="160px">{record.contractor}</Text>,
      <Text key={`amount-${index}`} fontSize="xs" fontWeight="700" color={BRAND_COLORS.blue}>{record.amount}</Text>,
      <Text key={`milestone-${index}`} fontSize="xs" color="gray.700" minW="140px">{record.milestone}</Text>,
      <Badge key={`status-${index}`} colorPalette={statusColorMap[record.status]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.status}
      </Badge>,
      <Text key={`requested-${index}`} fontSize="xs" color="gray.700">{record.requestedAt}</Text>,
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
              Escrow Releases
            </Text>
            <Text color="gray.500" fontSize="sm">
              Authorize milestone disbursements based on verified progress and compliance checks.
            </Text>
          </Stack>
          <LymnconButton
            label="Export Release Log"
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
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Total Release Requests</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>2,140</Text>
            </Box>
            <Box p={3} bg="blue.50" color="blue.500" borderRadius="xl"><Icon as={HandCoins} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Approved</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>1,620</Text>
            </Box>
            <Box p={3} bg="green.50" color="green.500" borderRadius="xl"><Icon as={CheckCircle2} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Pending</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>404</Text>
            </Box>
            <Box p={3} bg="orange.50" color="orange.500" borderRadius="xl"><Icon as={Clock3} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Flagged</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>116</Text>
            </Box>
            <Box p={3} bg="red.50" color="red.500" borderRadius="xl"><Icon as={AlertTriangle} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              Release Approval Queue
            </Text>
            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput placeholder="Search release..." pl={9} size="sm" w={{ base: '100%', md: '280px' }} />
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
            columns={['Project', 'Client', 'Contractor', 'Amount', 'Milestone', 'Status', 'Requested', 'Actions']}
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
