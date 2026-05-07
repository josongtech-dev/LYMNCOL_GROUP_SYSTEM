import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon, Badge } from '@chakra-ui/react'
import { FileSearch, CheckCircle2, AlertTriangle, Clock3, Search, Filter, Download, Eye, Flag } from 'lucide-react'
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

type ComplianceAuditRecord = {
  id: string
  module: string
  reference: string
  issueType: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Resolved' | 'Pending' | 'Escalated'
  owner: string
  updatedAt: string
}

export function AdminComplianceAuditsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: ComplianceAuditRecord[] = useMemo(() => {
    const seed: ComplianceAuditRecord[] = [
      {
        id: 'AUD-001',
        module: 'Escrow Releases',
        reference: 'ESC-1021',
        issueType: 'Missing verification evidence',
        severity: 'High',
        status: 'Pending',
        owner: 'Legal Team',
        updatedAt: 'Today 18:10',
      },
      {
        id: 'AUD-002',
        module: 'GPS Verification',
        reference: 'GPS-880',
        issueType: 'Location mismatch exception',
        severity: 'Critical',
        status: 'Escalated',
        owner: 'Security Team',
        updatedAt: 'Today 17:44',
      },
      {
        id: 'AUD-003',
        module: 'Projects',
        reference: 'PRJ-441',
        issueType: 'Milestone docs completed',
        severity: 'Low',
        status: 'Resolved',
        owner: 'Operations',
        updatedAt: 'Today 16:52',
      },
    ]

    const modules = ['Escrow Releases', 'GPS Verification', 'Projects', 'Clients', 'Finance', 'Contractors']
    const severities: ComplianceAuditRecord['severity'][] = ['Low', 'Medium', 'High', 'Critical']
    const statuses: ComplianceAuditRecord['status'][] = ['Resolved', 'Pending', 'Escalated']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `AUD-${(index + 4).toString().padStart(3, '0')}`,
      module: modules[index % modules.length],
      reference: `REF-${1000 + index}`,
      issueType: `Compliance issue type ${index + 4}`,
      severity: severities[index % severities.length],
      status: statuses[index % statuses.length],
      owner: index % 2 === 0 ? 'Legal Team' : 'Compliance Unit',
      updatedAt: `${(index % 28) + 1} Apr 2026`,
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
    const severityColorMap: Record<ComplianceAuditRecord['severity'], string> = {
      Low: 'green',
      Medium: 'blue',
      High: 'orange',
      Critical: 'red',
    }
    const statusColorMap: Record<ComplianceAuditRecord['status'], string> = {
      Resolved: 'green',
      Pending: 'orange',
      Escalated: 'red',
    }
    return [
      <Text key={`module-${index}`} fontSize="xs" fontWeight="600" color={BRAND_COLORS.blue}>{record.module}</Text>,
      <Text key={`reference-${index}`} fontSize="xs" color="gray.700">{record.reference}</Text>,
      <Text key={`issue-${index}`} fontSize="xs" color="gray.700" minW="230px">{record.issueType}</Text>,
      <Badge key={`severity-${index}`} colorPalette={severityColorMap[record.severity]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.severity}
      </Badge>,
      <Badge key={`status-${index}`} colorPalette={statusColorMap[record.status]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.status}
      </Badge>,
      <Text key={`owner-${index}`} fontSize="xs" color="gray.700">{record.owner}</Text>,
      <Text key={`updated-${index}`} fontSize="xs" color="gray.700">{record.updatedAt}</Text>,
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
              Compliance & Audits
            </Text>
            <Text color="gray.500" fontSize="sm">
              Run compliance checks, audit exceptions, and policy review outcomes across platform modules.
            </Text>
          </Stack>
          <LymnconButton
            label="Export Audit Report"
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
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Total Audits</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>1,960</Text>
            </Box>
            <Box p={3} bg="blue.50" color="blue.500" borderRadius="xl"><Icon as={FileSearch} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Resolved</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>1,420</Text>
            </Box>
            <Box p={3} bg="green.50" color="green.500" borderRadius="xl"><Icon as={CheckCircle2} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Pending</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>406</Text>
            </Box>
            <Box p={3} bg="orange.50" color="orange.500" borderRadius="xl"><Icon as={Clock3} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Escalated</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>134</Text>
            </Box>
            <Box p={3} bg="red.50" color="red.500" borderRadius="xl"><Icon as={AlertTriangle} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              Audit Queue
            </Text>
            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput placeholder="Search audit..." pl={9} size="sm" w={{ base: '100%', md: '280px' }} />
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
            columns={['Module', 'Reference', 'Issue Type', 'Severity', 'Status', 'Owner', 'Updated', 'Actions']}
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
