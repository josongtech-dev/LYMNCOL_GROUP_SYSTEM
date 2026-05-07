import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon, Badge } from '@chakra-ui/react'
import { MapPinned, CheckCircle2, AlertTriangle, Clock3, Search, Filter, Download, Eye, Flag } from 'lucide-react'
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

type GpsVerificationRecord = {
  id: string
  project: string
  submittedBy: string
  expectedLocation: string
  detectedLocation: string
  accuracy: 'High' | 'Medium' | 'Low'
  status: 'Verified' | 'Mismatch' | 'Pending'
  submittedAt: string
}

export function AdminGpsVerificationPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: GpsVerificationRecord[] = useMemo(() => {
    const seed: GpsVerificationRecord[] = [
      {
        id: 'GPS-001',
        project: 'Westlands Heights',
        submittedBy: 'John Mwangi',
        expectedLocation: 'Nairobi Site A',
        detectedLocation: 'Nairobi Site A',
        accuracy: 'High',
        status: 'Verified',
        submittedAt: 'Today 18:20',
      },
      {
        id: 'GPS-002',
        project: 'Ocean View Villas',
        submittedBy: 'Sarah Chen',
        expectedLocation: 'Mombasa Site C',
        detectedLocation: 'Mombasa Site B',
        accuracy: 'Medium',
        status: 'Mismatch',
        submittedAt: 'Today 17:55',
      },
      {
        id: 'GPS-003',
        project: 'Kisumu Business Park',
        submittedBy: 'Robert Otieno',
        expectedLocation: 'Kisumu Site Hub',
        detectedLocation: 'Awaiting Signal',
        accuracy: 'Low',
        status: 'Pending',
        submittedAt: 'Today 17:34',
      },
    ]

    const accuracies: GpsVerificationRecord['accuracy'][] = ['High', 'Medium', 'Low']
    const statuses: GpsVerificationRecord['status'][] = ['Verified', 'Mismatch', 'Pending']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `GPS-${(index + 4).toString().padStart(3, '0')}`,
      project: `Project ${index + 4}`,
      submittedBy: `User ${index + 4}`,
      expectedLocation: index % 2 === 0 ? 'Nairobi Site A' : 'Arusha Site B',
      detectedLocation: index % 3 === 0 ? 'Nairobi Site A' : 'Arusha Site B',
      accuracy: accuracies[index % accuracies.length],
      status: statuses[index % statuses.length],
      submittedAt: `${(index % 28) + 1} Apr 2026`,
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
    const accuracyColorMap: Record<GpsVerificationRecord['accuracy'], string> = {
      High: 'green',
      Medium: 'orange',
      Low: 'red',
    }
    const statusColorMap: Record<GpsVerificationRecord['status'], string> = {
      Verified: 'green',
      Mismatch: 'red',
      Pending: 'orange',
    }
    return [
      <Stack key={`project-${index}`} gap={0} minW="160px">
        <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="xs">{record.project}</Text>
        <Text fontSize="10px" color="gray.500">{record.id}</Text>
      </Stack>,
      <Text key={`submittedBy-${index}`} fontSize="xs" color="gray.700" minW="130px">{record.submittedBy}</Text>,
      <Text key={`expected-${index}`} fontSize="xs" color="gray.700" minW="140px">{record.expectedLocation}</Text>,
      <Text key={`detected-${index}`} fontSize="xs" color="gray.700" minW="140px">{record.detectedLocation}</Text>,
      <Badge key={`accuracy-${index}`} colorPalette={accuracyColorMap[record.accuracy]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.accuracy}
      </Badge>,
      <Badge key={`status-${index}`} colorPalette={statusColorMap[record.status]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.status}
      </Badge>,
      <Text key={`submittedAt-${index}`} fontSize="xs" color="gray.700">{record.submittedAt}</Text>,
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
              GPS Verification
            </Text>
            <Text color="gray.500" fontSize="sm">
              Validate uploaded progress media against approved site geolocation references.
            </Text>
          </Stack>
          <LymnconButton
            label="Export Verification Log"
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
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Total Checks</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>3,420</Text>
            </Box>
            <Box p={3} bg="blue.50" color="blue.500" borderRadius="xl"><Icon as={MapPinned} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Verified</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>2,981</Text>
            </Box>
            <Box p={3} bg="green.50" color="green.500" borderRadius="xl"><Icon as={CheckCircle2} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Mismatches</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>274</Text>
            </Box>
            <Box p={3} bg="orange.50" color="orange.500" borderRadius="xl"><Icon as={AlertTriangle} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Pending</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>165</Text>
            </Box>
            <Box p={3} bg="purple.50" color="purple.500" borderRadius="xl"><Icon as={Clock3} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              Verification Queue
            </Text>
            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput placeholder="Search verifications..." pl={9} size="sm" w={{ base: '100%', md: '280px' }} />
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
            columns={['Project', 'Submitted By', 'Expected Location', 'Detected Location', 'Accuracy', 'Status', 'Submitted', 'Actions']}
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
