import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { Scale, FileCheck, ShieldAlert, AlertTriangle, Search, Filter, Download, Plus, FolderKanban, Eye, Flag, Trash2 } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import { AdminLegalTeamTable, type LegalTeamRecord } from '../components/admin/AdminLegalTeamTable'
import type { LymnconActionItem } from '../lymncon_component/LymnconActionMenu'
import {
  BRAND_COLORS,
  LymnconCard,
  LymnconButton,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
} from '../lymncon_component'

export function AdminLegalTeamPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: LegalTeamRecord[] = useMemo(() => {
    const seed: LegalTeamRecord[] = [
      {
        id: 'LEG-001',
        fullName: 'Grace Njeri',
        role: 'Head of Legal',
        unit: 'Compliance Unit',
        successfulCases: 31,
        rating: 4.9,
        status: 'Active',
        email: 'grace.n@lymncol-demo.com',
        phone: '+254 701 221 100',
      },
      {
        id: 'LEG-002',
        fullName: 'Patrick Oloo',
        role: 'Senior Counsel',
        unit: 'Contracts Unit',
        successfulCases: 22,
        rating: 4.6,
        status: 'Active',
        email: 'patrick.o@lymncol-demo.com',
        phone: '+254 722 220 333',
      },
      {
        id: 'LEG-003',
        fullName: 'Anita Mwangi',
        role: 'Compliance Officer',
        unit: 'Compliance Unit',
        successfulCases: 17,
        rating: 4.3,
        status: 'On Leave',
        email: 'anita.m@lymncol-demo.com',
        phone: '+254 733 777 555',
      },
    ]

    const roles = ['Legal Counsel', 'Compliance Officer', 'Contract Analyst', 'Dispute Officer']
    const units = ['Contracts Unit', 'Compliance Unit', 'Dispute Resolution', 'Policy & Governance']
    const generated = Array.from({ length: 37 }, (_, index) => ({
      id: `LEG-${(index + 4).toString().padStart(3, '0')}`,
      fullName: `Legal Officer ${index + 4}`,
      role: roles[index % roles.length],
      unit: units[index % units.length],
      successfulCases: (index % 26) + 4,
      rating: Number((3.7 + (index % 12) * 0.1).toFixed(1)),
      status: (index % 11 === 0 ? 'Suspended' : index % 7 === 0 ? 'On Leave' : 'Active') as LegalTeamRecord['status'],
      email: `legal${index + 4}@lymncol-demo.com`,
      phone: `+254 72${(1000000 + index).toString().slice(-7)}`,
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
    { label: 'Legal Team', value: '74', icon: Scale, color: 'blue' },
    { label: 'Cases Closed', value: '932', icon: FileCheck, color: 'green' },
    { label: 'Compliance Alerts', value: '19', icon: ShieldAlert, color: 'purple' },
    { label: 'High Risk Flags', value: '5', icon: AlertTriangle, color: 'orange' },
  ]

  const legalActionOptions: LymnconActionItem[] = [
    { label: 'Assign Project', value: 'assign-project', icon: <Icon as={FolderKanban} boxSize={3.5} /> },
    { label: 'View Profile', value: 'view-profile', icon: <Icon as={Eye} boxSize={3.5} /> },
    { label: 'Suspend', value: 'suspend', icon: <Icon as={ShieldAlert} boxSize={3.5} /> },
    { label: 'Flag', value: 'flag', icon: <Icon as={Flag} boxSize={3.5} /> },
    { label: 'Delete', value: 'delete', icon: <Icon as={Trash2} boxSize={3.5} /> },
  ]

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Legal Team Management
            </Text>
            <Text color="gray.500" fontSize="sm">
              Overview of legal officers managing contracts, compliance, and dispute resolution.
            </Text>
           param($m) 
    # Only replace Stack closing tags that follow our pattern � we need to be smarter
    $m
  
          <Flex gap={3} wrap="wrap">
            <LymnconButton
              label="Export Report"
              variant="outline"
              size="sm"
              leftIcon={<Icon as={Download} boxSize={4} />}
            />
            <LymnconButton
              label="Add Legal Officer"
              size="sm"
              bg={BRAND_COLORS.gold}
              _hover={{ bg: BRAND_COLORS.blue }}
              leftIcon={<Icon as={Plus} boxSize={4} />}
            />
           param($m) 
    # Only replace Stack closing tags that follow our pattern � we need to be smarter
    $m
  
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
              Legal Team Directory
            </Text>

            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput
                  placeholder="Search legal officers..."
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

          <AdminLegalTeamTable records={paginatedRecords} actionOptions={legalActionOptions} />

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
         param($m) 
    # Only replace Stack closing tags that follow our pattern � we need to be smarter
    $m
  
      </LymnconCard>
    </AdminDashboardStructure>
  )
}
