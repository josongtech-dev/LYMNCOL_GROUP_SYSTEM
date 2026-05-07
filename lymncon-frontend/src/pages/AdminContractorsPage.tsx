import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { Briefcase, Building2, UserCheck, AlertTriangle, Search, Filter, Download, Plus, FolderKanban, Eye, ShieldAlert, Flag, Trash2 } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import { AdminContractorsTable, type ContractorRecord } from '../components/admin/AdminContractorsTable'
import type { LymnconActionItem } from '../lymncon_component/LymnconActionMenu'
import {
  BRAND_COLORS,
  LymnconCard,
  LymnconButton,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
} from '../lymncon_component'

export function AdminContractorsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: ContractorRecord[] = useMemo(() => {
    const seed: ContractorRecord[] = [
      {
        id: 'CON-001',
        name: 'John Mwangi',
        company: 'Build-It Construction Ltd',
        specialization: 'Civil Works',
        projects: 4,
        rating: 4.8,
        status: 'Active',
        email: 'john.m@buildit.co.ke',
        phone: '+254 700 111 222',
      },
      {
        id: 'CON-002',
        name: 'Sarah Chen',
        company: 'Apex Electrical Systems',
        specialization: 'Electrical',
        projects: 7,
        rating: 4.5,
        status: 'Active',
        email: 's.chen@apexelectrical.com',
        phone: '+254 722 333 444',
      },
      {
        id: 'CON-003',
        name: 'Robert Otieno',
        company: 'AquaFlow Plumbing',
        specialization: 'Plumbing',
        projects: 2,
        rating: 3.9,
        status: 'On Hold',
        email: 'robert@aquaflow.com',
        phone: '+254 733 444 555',
      },
    ]

    const specializations = ['Civil Works', 'Electrical', 'Plumbing', 'Finishes', 'Steel Work']
    const generated = Array.from({ length: 37 }, (_, index) => ({
      id: `CON-${(index + 4).toString().padStart(3, '0')}`,
      name: `Contractor ${index + 4}`,
      company: `Firm ${index + 4} Construction`,
      specialization: specializations[index % specializations.length],
      projects: (index % 10) + 1,
      rating: Number((3.5 + (index % 15) * 0.1).toFixed(1)),
      status: (index % 7 === 0 ? 'On Hold' : 'Active') as ContractorRecord['status'],
      email: `contractor${index + 4}@lymncol-demo.com`,
      phone: `+254 71${(1000000 + index).toString().slice(-7)}`,
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
    { label: 'Total Contractors', value: '248', icon: Building2, color: 'blue' },
    { label: 'Active on Site', value: '186', icon: Briefcase, color: 'green' },
    { label: 'Verified Partners', value: '210', icon: UserCheck, color: 'purple' },
    { label: 'On Warning', value: '14', icon: AlertTriangle, color: 'orange' },
  ]

  const contractorActionOptions: LymnconActionItem[] = [
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
              Contractor Management
            </Text>
            <Text color="gray.500" fontSize="sm">
              Overview of all registered construction firms and independent contractors.
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
              label="Register Contractor" 
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
              Contractor Database
            </Text>
            
            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput 
                  placeholder="Search firms or specializations..." 
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

          <AdminContractorsTable records={paginatedRecords} actionOptions={contractorActionOptions} />

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
