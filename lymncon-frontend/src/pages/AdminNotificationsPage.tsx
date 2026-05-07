import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon, Badge } from '@chakra-ui/react'
import { Bell, CheckCircle2, Clock3, AlertTriangle, Search, Filter, Download } from 'lucide-react'
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

type NotificationRecord = {
  id: string
  timestamp: string
  title: string
  category: 'System' | 'Project' | 'Security' | 'Finance'
  priority: 'Low' | 'Medium' | 'High'
  status: 'Unread' | 'Read'
}

export function AdminNotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: NotificationRecord[] = useMemo(() => {
    const seed: NotificationRecord[] = [
      {
        id: 'NTF-001',
        timestamp: 'Today 21:12',
        title: 'Milestone approval submitted for PRJ-042',
        category: 'Project',
        priority: 'High',
        status: 'Unread',
      },
      {
        id: 'NTF-002',
        timestamp: 'Today 20:48',
        title: 'Suspicious login blocked for admin account',
        category: 'Security',
        priority: 'High',
        status: 'Unread',
      },
      {
        id: 'NTF-003',
        timestamp: 'Today 20:05',
        title: 'Weekly performance digest generated',
        category: 'System',
        priority: 'Low',
        status: 'Read',
      },
    ]

    const categories: NotificationRecord['category'][] = ['System', 'Project', 'Security', 'Finance']
    const priorities: NotificationRecord['priority'][] = ['Low', 'Medium', 'High']
    const statuses: NotificationRecord['status'][] = ['Unread', 'Read']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `NTF-${(index + 4).toString().padStart(3, '0')}`,
      timestamp: `${(index % 28) + 1} Apr 2026`,
      title: `Notification event ${index + 4}`,
      category: categories[index % categories.length],
      priority: priorities[index % priorities.length],
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
    const priorityColorMap: Record<NotificationRecord['priority'], string> = {
      Low: 'green',
      Medium: 'blue',
      High: 'orange',
    }
    const statusColorMap: Record<NotificationRecord['status'], string> = {
      Unread: 'orange',
      Read: 'green',
    }

    return [
      <Text key={`time-${index}`} fontSize="xs" color="gray.700">{record.timestamp}</Text>,
      <Text key={`title-${index}`} fontSize="xs" color="gray.700" minW="260px">{record.title}</Text>,
      <Badge key={`category-${index}`} variant="outline" colorPalette="blue" size="sm" fontSize="10px">
        {record.category}
      </Badge>,
      <Badge key={`priority-${index}`} colorPalette={priorityColorMap[record.priority]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.priority}
      </Badge>,
      <Badge key={`status-${index}`} colorPalette={statusColorMap[record.status]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.status}
      </Badge>,
    ]
  })

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize="2xl" fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Notifications
            </Text>
            <Text color="gray.500" fontSize="sm">
              Review platform alerts, updates, and operational notifications across all modules.
            </Text>
          </Stack>
          <LymnconButton
            label="Export Notifications"
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
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Total Notifications</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>5,820</Text>
            </Box>
            <Box p={3} bg="blue.50" color="blue.500" borderRadius="xl"><Icon as={Bell} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Unread</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>412</Text>
            </Box>
            <Box p={3} bg="orange.50" color="orange.500" borderRadius="xl"><Icon as={Clock3} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Read</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>5,186</Text>
            </Box>
            <Box p={3} bg="green.50" color="green.500" borderRadius="xl"><Icon as={CheckCircle2} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">High Priority</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>222</Text>
            </Box>
            <Box p={3} bg="red.50" color="red.500" borderRadius="xl"><Icon as={AlertTriangle} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              Notification Feed
            </Text>
            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput placeholder="Search notifications..." pl={9} size="sm" w={{ base: '100%', md: '280px' }} />
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
            columns={['Timestamp', 'Notification', 'Category', 'Priority', 'Status']}
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
