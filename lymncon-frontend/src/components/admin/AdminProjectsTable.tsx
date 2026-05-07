import { Box, Flex, Stack, Text, Icon } from '@chakra-ui/react'
import { Eye, Flag, MapPinned, Navigation, Trash2 } from 'lucide-react'
import {
  BRAND_COLORS,
  LymnconActionMenu,
  LymnconTable,
} from '../../lymncon_component'
import type { LymnconActionItem } from '../../lymncon_component/LymnconActionMenu'

export type ProjectRecord = {
  id: string
  name: string
  location: string
  client: string
  setPeriod: string
  completionStatus: 'Completed' | 'In Progress' | 'Planning'
}

type AdminProjectsTableProps = {
  records: ProjectRecord[]
  columns?: string[]
  actionOptions?: LymnconActionItem[]
}

const defaultActionOptions: LymnconActionItem[] = [
  { label: 'Track', value: 'track', icon: <Icon as={Navigation} boxSize={3.5} /> },
  { label: 'View', value: 'view', icon: <Icon as={Eye} boxSize={3.5} /> },
  { label: 'Flag', value: 'flag', icon: <Icon as={Flag} boxSize={3.5} /> },
  { label: 'Delete', value: 'delete', icon: <Icon as={Trash2} boxSize={3.5} /> },
]

export function AdminProjectsTable({
  records,
  columns = ['Name', 'Location', 'Client', 'Set Period', 'Completion Status', 'Actions'],
  actionOptions = defaultActionOptions,
}: AdminProjectsTableProps) {
  const getCompletionConfig = (status: ProjectRecord['completionStatus']) => {
    const map: Record<ProjectRecord['completionStatus'], { value: number; fill: string; label: string }> = {
      Planning: { value: 0, fill: 'transparent', label: 'Planning' },
      'In Progress': { value: 64, fill: BRAND_COLORS.gold, label: 'In Progress' },
      Completed: { value: 100, fill: BRAND_COLORS.blue, label: 'Completed' },
    }
    return map[status]
  }

  const rows = records.map((record) => [
    <Stack key={`${record.id}-name`} gap={0} minW="170px">
      <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="xs">{record.name}</Text>
      <Text fontSize="10px" color="gray.500">{record.id}</Text>
    </Stack>,
    <Flex key={`${record.id}-location`} align="center" gap={1.5} minW="140px">
      <Icon as={MapPinned} boxSize={3.5} color="gray.400" />
      <Text fontSize="xs" color="gray.700">{record.location}</Text>
    </Flex>,
    <Text key={`${record.id}-client`} fontSize="xs" color="gray.700" minW="160px">
      {record.client}
    </Text>,
    <Text key={`${record.id}-period`} fontSize="xs" color="gray.700" minW="130px">
      {record.setPeriod}
    </Text>,
    <Stack key={`${record.id}-status`} gap={1.5} minW="170px">
      <Text fontSize="xs" fontWeight="bold" color={BRAND_COLORS.blue}>
        {getCompletionConfig(record.completionStatus).label}
      </Text>
      <Box h="6px" bg="#E6EDF4" borderRadius="full" overflow="hidden">
        <Box
          h="100%"
          w={`${getCompletionConfig(record.completionStatus).value}%`}
          bg={getCompletionConfig(record.completionStatus).fill}
          borderRadius="full"
          transition="width 0.25s ease"
        />
      </Box>
    </Stack>,
    <Box key={`${record.id}-actions`} minW="64px">
      <LymnconActionMenu actions={actionOptions} />
    </Box>,
  ])

  return <LymnconTable columns={columns} rows={rows} />
}
