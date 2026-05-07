import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { FolderKanban, CheckCircle2, Clock3, Search, Filter, Download, Plus, Navigation, Eye, Flag, Trash2 } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import { AdminProjectsTable, type ProjectRecord } from '../components/admin/AdminProjectsTable'
import type { LymnconActionItem } from '../lymncon_component/LymnconActionMenu'
import {
  BRAND_COLORS,
  LymnconCard,
  LymnconButton,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
} from '../lymncon_component'

export function AdminProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: ProjectRecord[] = useMemo(() => {
    const seed: ProjectRecord[] = [
      {
        id: 'PRJ-001',
        name: 'Westlands Heights Apartments',
        location: 'Nairobi, Kenya',
        client: 'Muriithi Holdings',
        setPeriod: 'Jan 2026 - Dec 2026',
        completionStatus: 'In Progress',
      },
      {
        id: 'PRJ-002',
        name: 'Ocean View Villas',
        location: 'Mombasa, Kenya',
        client: 'R&K Estates',
        setPeriod: 'Mar 2026 - Feb 2027',
        completionStatus: 'Planning',
      },
      {
        id: 'PRJ-003',
        name: 'Kisumu Business Park',
        location: 'Kisumu, Kenya',
        client: 'Ngetich Properties',
        setPeriod: 'Apr 2025 - Apr 2026',
        completionStatus: 'Completed',
      },
    ]

    const locations = ['Nairobi, Kenya', 'Mombasa, Kenya', 'Kisumu, Kenya', 'Nakuru, Kenya', 'Arusha, Tanzania']
    const statuses: ProjectRecord['completionStatus'][] = ['In Progress', 'Planning', 'Completed']
    const generated = Array.from({ length: 57 }, (_, index) => {
      const monthStart = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index % 6]
      const monthEnd = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index % 6]
      return {
        id: `PRJ-${(index + 4).toString().padStart(3, '0')}`,
        name: `Project ${index + 4}`,
        location: locations[index % locations.length],
        client: `Client Organization ${index + 4}`,
        setPeriod: `${monthStart} 2026 - ${monthEnd} 2027`,
        completionStatus: statuses[index % statuses.length],
      }
    })

    return [...seed, ...generated]
  }, [])

  const totalPages = Math.max(1, Math.ceil(records.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedRecords = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage
    return records.slice(start, start + itemsPerPage)
  }, [itemsPerPage, records, safePage])

  const stats = [
    { label: 'Total Projects', value: '860', icon: FolderKanban, color: 'blue' },
    { label: 'In Progress', value: '318', icon: Clock3, color: 'orange' },
    { label: 'Completed', value: '412', icon: CheckCircle2, color: 'green' },
    { label: 'Planning', value: '130', icon: Clock3, color: 'purple' },
  ]

  const projectActionOptions: LymnconActionItem[] = [
    { label: 'Track', value: 'track', icon: <Icon as={Navigation} boxSize={3.5} /> },
    { label: 'View', value: 'view', icon: <Icon as={Eye} boxSize={3.5} /> },
    { label: 'Flag', value: 'flag', icon: <Icon as={Flag} boxSize={3.5} /> },
    { label: 'Delete', value: 'delete', icon: <Icon as={Trash2} boxSize={3.5} /> },
  ]

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Project Management
            </Text>
            <Text color="gray.500" fontSize="sm">
              Track portfolio progress across planning, in-progress, and completed projects.
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
              label="Add Project"
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
              Projects Directory
            </Text>

            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput
                  placeholder="Search projects..."
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

          <AdminProjectsTable records={paginatedRecords} actionOptions={projectActionOptions} />

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
