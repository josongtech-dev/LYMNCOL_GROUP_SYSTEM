import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon, Badge } from '@chakra-ui/react'
import { Users, FolderKanban, Clock3, CheckCircle2, Search, Filter, Download, Plus, Eye, ShieldAlert, Flag, Trash2 } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import { AdminClientsTable, type ClientRecord } from '../components/admin/AdminClientsTable'
import type { LymnconActionItem } from '../lymncon_component/LymnconActionMenu'
import {
  BRAND_COLORS,
  LymnconCard,
  LymnconButton,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
} from '../lymncon_component'

export function AdminClientsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: ClientRecord[] = useMemo(() => {
    const seed: ClientRecord[] = [
      {
        id: 'CLI-001',
        fullName: 'Daniel Muriithi',
        organization: 'Muriithi Holdings',
        location: 'Nairobi, Kenya',
        totalProjects: 5,
        projectStage: 'In Progress',
        email: 'daniel.m@lymncol-demo.com',
        phone: '+254 701 991 100',
      },
      {
        id: 'CLI-002',
        fullName: 'Rose Kamau',
        organization: 'R&K Estates',
        location: 'Mombasa, Kenya',
        totalProjects: 3,
        projectStage: 'Planning',
        email: 'rose.k@lymncol-demo.com',
        phone: '+254 722 321 444',
      },
      {
        id: 'CLI-003',
        fullName: 'Joseph Ngetich',
        organization: 'Ngetich Properties',
        location: 'Kisumu, Kenya',
        totalProjects: 7,
        projectStage: 'Completed',
        email: 'joseph.n@lymncol-demo.com',
        phone: '+254 733 741 555',
      },
    ]

    const locations = ['Nairobi, Kenya', 'Mombasa, Kenya', 'Kisumu, Kenya', 'Nakuru, Kenya', 'Arusha, Tanzania']
    const stages: ClientRecord['projectStage'][] = ['In Progress', 'Planning', 'Completed']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `CLI-${(index + 4).toString().padStart(3, '0')}`,
      fullName: `Client ${index + 4}`,
      organization: `Client Organization ${index + 4}`,
      location: locations[index % locations.length],
      totalProjects: (index % 9) + 1,
      projectStage: stages[index % stages.length],
      email: `client${index + 4}@lymncol-demo.com`,
      phone: `+254 73${(1000000 + index).toString().slice(-7)}`,
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
    { label: 'Total Clients', value: '1,042', icon: Users, color: 'blue' },
    { label: 'Projects In Progress', value: '318', icon: FolderKanban, color: 'green' },
    { label: 'Planning Projects', value: '204', icon: Clock3, color: 'orange' },
    { label: 'Completed Projects', value: '520', icon: CheckCircle2, color: 'purple' },
  ]

  const clientActionOptions: LymnconActionItem[] = [
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
            <Flex align="center" gap={2}>
              <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
                Client Management
              </Text>
              <Badge colorPalette="orange" variant="subtle" borderRadius="full" px={2} py={0.5}>
                Main Focus
              </Badge>
            </Flex>
            <Text color="gray.500" fontSize="sm">
              Manage client lifecycle from planning to in-progress and closed project portfolios.
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
              label="Add Client"
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
              Client Directory
            </Text>

            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput
                  placeholder="Search clients..."
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

          <AdminClientsTable records={paginatedRecords} actionOptions={clientActionOptions} />

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
