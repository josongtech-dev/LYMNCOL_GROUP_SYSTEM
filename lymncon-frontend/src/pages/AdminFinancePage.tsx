import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { Calculator, Wallet, HandCoins, AlertTriangle, Search, Filter, Download, Plus, FolderKanban, Eye, ShieldAlert, Flag, Trash2 } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import { AdminFinanceTable, type FinanceRecord } from '../components/admin/AdminFinanceTable'
import type { LymnconActionItem } from '../lymncon_component/LymnconActionMenu'
import {
  BRAND_COLORS,
  LymnconCard,
  LymnconButton,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
} from '../lymncon_component'

export function AdminFinancePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: FinanceRecord[] = useMemo(() => {
    const seed: FinanceRecord[] = [
      {
        id: 'FIN-001',
        fullName: 'Mercy Wanjiku',
        role: 'Finance Manager',
        team: 'Escrow Operations',
        successfulReleases: 24,
        rating: 4.9,
        status: 'Active',
        email: 'mercy.w@lymncol-demo.com',
        phone: '+254 701 111 222',
      },
      {
        id: 'FIN-002',
        fullName: 'James Kariuki',
        role: 'Senior Accountant',
        team: 'Reconciliation',
        successfulReleases: 18,
        rating: 4.6,
        status: 'Active',
        email: 'james.k@lymncol-demo.com',
        phone: '+254 722 333 444',
      },
      {
        id: 'FIN-003',
        fullName: 'Linda Achieng',
        role: 'Disbursement Officer',
        team: 'Escrow Operations',
        successfulReleases: 12,
        rating: 4.2,
        status: 'On Leave',
        email: 'linda.a@lymncol-demo.com',
        phone: '+254 733 444 555',
      },
    ]

    const roles = ['Finance Analyst', 'Disbursement Officer', 'Senior Accountant', 'Audit Officer']
    const teams = ['Escrow Operations', 'Reconciliation', 'Audit & Compliance', 'Treasury Control']
    const generated = Array.from({ length: 37 }, (_, index) => ({
      id: `FIN-${(index + 4).toString().padStart(3, '0')}`,
      fullName: `Finance Officer ${index + 4}`,
      role: roles[index % roles.length],
      team: teams[index % teams.length],
      successfulReleases: (index % 28) + 3,
      rating: Number((3.6 + (index % 12) * 0.1).toFixed(1)),
      status: (index % 11 === 0 ? 'Suspended' : index % 7 === 0 ? 'On Leave' : 'Active') as FinanceRecord['status'],
      email: `finance${index + 4}@lymncol-demo.com`,
      phone: `+254 70${(1000000 + index).toString().slice(-7)}`,
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
    { label: 'Finance Team', value: '96', icon: Calculator, color: 'blue' },
    { label: 'Successful Releases', value: '1,284', icon: HandCoins, color: 'green' },
    { label: 'Escrow Managed', value: '$4.2M', icon: Wallet, color: 'purple' },
    { label: 'Flagged Profiles', value: '7', icon: AlertTriangle, color: 'orange' },
  ]

  const financeActionOptions: LymnconActionItem[] = [
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
              Finance Management
            </Text>
            <Text color="gray.500" fontSize="sm">
              Overview of finance officers handling escrow releases, reconciliations, and audits.
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
              label="Add Finance Officer"
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
              Finance Team Directory
            </Text>

            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput
                  placeholder="Search finance officers..."
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

          <AdminFinanceTable records={paginatedRecords} actionOptions={financeActionOptions} />

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
