import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { Headset, AlertTriangle, Clock3, CheckCircle2, Search, Filter, Download, Plus, Eye, Mail, MessageSquareWarning, Flag, Trash2 } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import { AdminHelpDeskTable, type HelpDeskTicket } from '../components/admin/AdminHelpDeskTable'
import type { LymnconActionItem } from '../lymncon_component/LymnconActionMenu'
import {
  BRAND_COLORS,
  LymnconCard,
  LymnconButton,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
} from '../lymncon_component'

export function AdminHelpDeskPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: HelpDeskTicket[] = useMemo(() => {
    const seed: HelpDeskTicket[] = [
      {
        id: 'TCK-001',
        subject: 'Unable to upload project photos',
        requester: 'Daniel Muriithi',
        channel: 'Client',
        priority: 'High',
        status: 'Open',
        updatedAt: 'Today 14:10',
      },
      {
        id: 'TCK-002',
        subject: 'Escrow release not reflected',
        requester: 'John Mwangi',
        channel: 'Contractor',
        priority: 'Critical',
        status: 'In Progress',
        updatedAt: 'Today 13:25',
      },
      {
        id: 'TCK-003',
        subject: 'Access request approval delay',
        requester: 'Internal Admin',
        channel: 'Internal',
        priority: 'Medium',
        status: 'Resolved',
        updatedAt: 'Yesterday 18:40',
      },
    ]

    const channels: HelpDeskTicket['channel'][] = ['Client', 'Contractor', 'Internal']
    const priorities: HelpDeskTicket['priority'][] = ['Low', 'Medium', 'High', 'Critical']
    const statuses: HelpDeskTicket['status'][] = ['Open', 'In Progress', 'Resolved']

    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `TCK-${(index + 4).toString().padStart(3, '0')}`,
      subject: `Support ticket ${index + 4}`,
      requester: `Requester ${index + 4}`,
      channel: channels[index % channels.length],
      priority: priorities[index % priorities.length],
      status: statuses[index % statuses.length],
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

  const stats = [
    { label: 'Total Tickets', value: '642', icon: Headset, color: 'blue' },
    { label: 'Open Tickets', value: '94', icon: AlertTriangle, color: 'orange' },
    { label: 'In Progress', value: '138', icon: Clock3, color: 'purple' },
    { label: 'Resolved', value: '410', icon: CheckCircle2, color: 'green' },
  ]

  const helpDeskActionOptions: LymnconActionItem[] = [
    { label: 'Track', value: 'track', icon: <Icon as={Eye} boxSize={3.5} /> },
    { label: 'Respond', value: 'respond', icon: <Icon as={Mail} boxSize={3.5} /> },
    { label: 'Escalate', value: 'escalate', icon: <Icon as={MessageSquareWarning} boxSize={3.5} /> },
    { label: 'Flag', value: 'flag', icon: <Icon as={Flag} boxSize={3.5} /> },
    { label: 'Delete', value: 'delete', icon: <Icon as={Trash2} boxSize={3.5} /> },
  ]

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Help Desk
            </Text>
            <Text color="gray.500" fontSize="sm">
              Manage platform support issues from clients, contractors, and internal teams.
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
              label="Create Ticket"
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
              Ticket Queue
            </Text>

            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput
                  placeholder="Search tickets..."
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

          <AdminHelpDeskTable records={paginatedRecords} actionOptions={helpDeskActionOptions} />

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
