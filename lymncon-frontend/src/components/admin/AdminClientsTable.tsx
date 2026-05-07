import { Box, Flex, Stack, Text, Icon } from '@chakra-ui/react'
import { Briefcase, Eye, Flag, Mail, Phone, ShieldAlert, Trash2 } from 'lucide-react'
import {
  BRAND_COLORS,
  LymnconActionMenu,
  LymnconTable,
} from '../../lymncon_component'
import type { LymnconActionItem } from '../../lymncon_component/LymnconActionMenu'

export type ClientRecord = {
  id: string
  fullName: string
  organization: string
  location: string
  totalProjects: number
  projectStage: 'Completed' | 'In Progress' | 'Planning'
  email: string
  phone: string
}

type AdminClientsTableProps = {
  records: ClientRecord[]
  columns?: string[]
  actionOptions?: LymnconActionItem[]
}

const defaultActionOptions: LymnconActionItem[] = [
  { label: 'Assign Project', value: 'assign-project', icon: <Icon as={Briefcase} boxSize={3.5} /> },
  { label: 'View Profile', value: 'view-profile', icon: <Icon as={Eye} boxSize={3.5} /> },
  { label: 'Suspend', value: 'suspend', icon: <Icon as={ShieldAlert} boxSize={3.5} /> },
  { label: 'Flag', value: 'flag', icon: <Icon as={Flag} boxSize={3.5} /> },
  { label: 'Delete', value: 'delete', icon: <Icon as={Trash2} boxSize={3.5} /> },
]

export function AdminClientsTable({
  records,
  columns = ['Client / Organization', 'Location', 'Projects', 'Contact', 'Actions'],
  actionOptions = defaultActionOptions,
}: AdminClientsTableProps) {
  const getProjectProgressConfig = (stage: ClientRecord['projectStage']) => {
    const progressMap: Record<ClientRecord['projectStage'], { value: number; fill: string; label: string }> = {
      Planning: { value: 0, fill: 'transparent', label: 'Planning' },
      'In Progress': { value: 62, fill: BRAND_COLORS.gold, label: 'In Progress' },
      Completed: { value: 100, fill: BRAND_COLORS.blue, label: 'Completed' },
    }
    return progressMap[stage]
  }

  const rows = records.map((record) => [
    <Stack key={`${record.id}-details`} gap={0} minW="170px">
      <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="xs">{record.fullName}</Text>
      <Text fontSize="10px" color="gray.500">{record.organization}</Text>
    </Stack>,
    <Text key={`${record.id}-location`} fontSize="xs" color="gray.700" minW="120px">
      {record.location}
    </Text>,
    <Stack key={`${record.id}-projects`} gap={1.5} minW="170px">
      <Text fontSize="xs" fontWeight="bold" color={BRAND_COLORS.blue}>
        {getProjectProgressConfig(record.projectStage).label}
      </Text>
      <Box h="6px" bg="#E6EDF4" borderRadius="full" overflow="hidden">
        <Box
          h="100%"
          w={`${getProjectProgressConfig(record.projectStage).value}%`}
          bg={getProjectProgressConfig(record.projectStage).fill}
          borderRadius="full"
          transition="width 0.25s ease"
        />
      </Box>
    </Stack>,
    <Stack key={`${record.id}-contact`} gap={0.5} minW="170px">
      <Flex align="center" gap={1.5}>
        <Icon as={Mail} boxSize={3.5} color="gray.400" />
        <Text fontSize="xs" color="gray.700" truncate>{record.email}</Text>
      </Flex>
      <Flex align="center" gap={1.5}>
        <Icon as={Phone} boxSize={3.5} color="gray.400" />
        <Text fontSize="xs" color="gray.700">{record.phone}</Text>
      </Flex>
    </Stack>,
    <Box key={`${record.id}-actions`} minW="64px">
      <LymnconActionMenu actions={actionOptions} />
    </Box>,
  ])

  return <LymnconTable columns={columns} rows={rows} />
}
