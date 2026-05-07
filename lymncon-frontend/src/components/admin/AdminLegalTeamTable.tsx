import { Box, Flex, Stack, Text, Badge, Icon } from '@chakra-ui/react'
import { Briefcase, Eye, Flag, Mail, Phone, ShieldAlert, Star, Trash2 } from 'lucide-react'
import {
  BRAND_COLORS,
  LymnconActionMenu,
  LymnconTable,
} from '../../lymncon_component'
import type { LymnconActionItem } from '../../lymncon_component/LymnconActionMenu'

export type LegalTeamRecord = {
  id: string
  fullName: string
  role: string
  unit: string
  successfulCases: number
  rating: number
  status: 'Active' | 'On Leave' | 'Suspended'
  email: string
  phone: string
}

type AdminLegalTeamTableProps = {
  records: LegalTeamRecord[]
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

export function AdminLegalTeamTable({
  records,
  columns = ['Officer / Unit', 'Role', 'Successful Cases', 'Rating', 'Contact', 'Status', 'Actions'],
  actionOptions = defaultActionOptions,
}: AdminLegalTeamTableProps) {
  const getStatusBadge = (status: LegalTeamRecord['status']) => {
    const statusMap: Record<LegalTeamRecord['status'], { color: string }> = {
      Active: { color: 'green' },
      'On Leave': { color: 'orange' },
      Suspended: { color: 'red' },
    }
    const config = statusMap[status]

    return (
      <Badge colorPalette={config.color} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {status}
      </Badge>
    )
  }

  const rows = records.map((record) => [
    <Stack key={`${record.id}-details`} gap={0} minW="170px">
      <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="xs">{record.fullName}</Text>
      <Text fontSize="10px" color="gray.500">{record.unit}</Text>
    </Stack>,
    <Badge key={`${record.id}-role`} variant="outline" colorPalette="blue" size="sm" fontSize="10px">
      {record.role}
    </Badge>,
    <Stack key={`${record.id}-cases`} gap={1} minW="130px">
      <Text fontSize="xs" fontWeight="bold" color={BRAND_COLORS.blue}>
        {record.successfulCases} Closed
      </Text>
      <Text fontSize="10px" color="green.600">
        Successful legal cases
      </Text>
    </Stack>,
    <Flex key={`${record.id}-rating`} align="center" gap={1}>
      <Icon as={Star} boxSize={3} color="orange.400" fill="orange.400" />
      <Text fontSize="xs" fontWeight="bold">{record.rating}</Text>
    </Flex>,
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
    getStatusBadge(record.status),
    <Box key={`${record.id}-actions`} minW="64px">
      <LymnconActionMenu actions={actionOptions} />
    </Box>,
  ])

  return <LymnconTable columns={columns} rows={rows} />
}
