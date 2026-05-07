import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon, Badge } from '@chakra-ui/react'
import { Video, Radio, SignalHigh, AlertTriangle, Search, Filter, Download, Eye, Flag } from 'lucide-react'
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

type LiveSessionRecord = {
  id: string
  siteName: string
  location: string
  contractor: string
  streamStatus: 'Online' | 'Degraded' | 'Offline'
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  lastUpdate: string
}

export function AdminLiveSiteMonitorPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const sessions: LiveSessionRecord[] = useMemo(() => {
    const seed: LiveSessionRecord[] = [
      {
        id: 'LIV-001',
        siteName: 'Westlands Heights',
        location: 'Nairobi, Kenya',
        contractor: 'Build-It Construction Ltd',
        streamStatus: 'Online',
        quality: 'Excellent',
        lastUpdate: 'Now',
      },
      {
        id: 'LIV-002',
        siteName: 'Ocean View Villas',
        location: 'Mombasa, Kenya',
        contractor: 'Apex Civil Works',
        streamStatus: 'Degraded',
        quality: 'Fair',
        lastUpdate: '2 min ago',
      },
      {
        id: 'LIV-003',
        siteName: 'Kisumu Business Park',
        location: 'Kisumu, Kenya',
        contractor: 'UrbanCore Contractors',
        streamStatus: 'Offline',
        quality: 'Poor',
        lastUpdate: '9 min ago',
      },
    ]

    const statuses: LiveSessionRecord['streamStatus'][] = ['Online', 'Degraded', 'Offline']
    const qualities: LiveSessionRecord['quality'][] = ['Excellent', 'Good', 'Fair', 'Poor']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `LIV-${(index + 4).toString().padStart(3, '0')}`,
      siteName: `Project Site ${index + 4}`,
      location: index % 2 === 0 ? 'Nairobi, Kenya' : 'Arusha, Tanzania',
      contractor: `Contractor ${index + 4}`,
      streamStatus: statuses[index % statuses.length],
      quality: qualities[index % qualities.length],
      lastUpdate: `${(index % 14) + 1} min ago`,
    }))
    return [...seed, ...generated]
  }, [])

  const totalPages = Math.max(1, Math.ceil(sessions.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedSessions = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage
    return sessions.slice(start, start + itemsPerPage)
  }, [itemsPerPage, sessions, safePage])

  const rows = paginatedSessions.map((session, index) => {
    const statusColorMap: Record<LiveSessionRecord['streamStatus'], string> = {
      Online: 'green',
      Degraded: 'orange',
      Offline: 'red',
    }
    const qualityColorMap: Record<LiveSessionRecord['quality'], string> = {
      Excellent: 'green',
      Good: 'blue',
      Fair: 'orange',
      Poor: 'red',
    }
    return [
      <Stack key={`site-${index}`} gap={0} minW="170px">
        <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="xs">{session.siteName}</Text>
        <Text fontSize="10px" color="gray.500">{session.id}</Text>
      </Stack>,
      <Text key={`location-${index}`} fontSize="xs" color="gray.700" minW="120px">{session.location}</Text>,
      <Text key={`contractor-${index}`} fontSize="xs" color="gray.700" minW="170px">{session.contractor}</Text>,
      <Badge key={`status-${index}`} colorPalette={statusColorMap[session.streamStatus]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {session.streamStatus}
      </Badge>,
      <Badge key={`quality-${index}`} colorPalette={qualityColorMap[session.quality]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {session.quality}
      </Badge>,
      <Text key={`updated-${index}`} fontSize="xs" color="gray.700">{session.lastUpdate}</Text>,
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
              Live Site Monitor
            </Text>
            <Text color="gray.500" fontSize="sm">
              Track real-time site sessions, stream health, and evidence feed status.
            </Text>
          </Stack>
          <LymnconButton
            label="Export Session Log"
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
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Active Streams</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>126</Text>
            </Box>
            <Box p={3} bg="blue.50" color="blue.500" borderRadius="xl"><Icon as={Video} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Online Health</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>91%</Text>
            </Box>
            <Box p={3} bg="green.50" color="green.500" borderRadius="xl"><Icon as={SignalHigh} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Realtime Signals</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>1,842</Text>
            </Box>
            <Box p={3} bg="purple.50" color="purple.500" borderRadius="xl"><Icon as={Radio} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Alerts</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>12</Text>
            </Box>
            <Box p={3} bg="orange.50" color="orange.500" borderRadius="xl"><Icon as={AlertTriangle} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              Site Session Feed
            </Text>
            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput placeholder="Search sites..." pl={9} size="sm" w={{ base: '100%', md: '280px' }} />
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
            columns={['Site', 'Location', 'Contractor', 'Stream Status', 'Quality', 'Last Update', 'Actions']}
            rows={rows}
          />

          <LymnconPagination
            totalItems={sessions.length}
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
