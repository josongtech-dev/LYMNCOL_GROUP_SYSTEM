import { Box, Flex, Stack, Text, Badge, Icon } from '@chakra-ui/react'
import { Eye, Flag, ShieldAlert, Trash2, UserCog } from 'lucide-react'
import {
  BRAND_COLORS,
  LymnconActionMenu,
  LymnconTable,
} from '../../lymncon_component'
import type { LymnconActionItem } from '../../lymncon_component/LymnconActionMenu'

export type UserRecord = {
  id: string
  fullName: string
  email: string
  role: string
  controllerType: string
  status: 'Active' | 'Suspended' | 'Pending'
  lastSeen: string
}

type AdminUsersTableProps = {
  records: UserRecord[]
  columns?: string[]
  actionOptions?: LymnconActionItem[]
}

const defaultActionOptions: LymnconActionItem[] = [
  { label: 'View Profile', value: 'view-profile', icon: <Icon as={Eye} boxSize={3.5} /> },
  { label: 'Suspend', value: 'suspend', icon: <Icon as={ShieldAlert} boxSize={3.5} /> },
  { label: 'Flag', value: 'flag', icon: <Icon as={Flag} boxSize={3.5} /> },
  { label: 'Delete', value: 'delete', icon: <Icon as={Trash2} boxSize={3.5} /> },
]

export function AdminUsersTable({
  records,
  columns = ['User', 'Email', 'Role', 'Controller Type', 'Status', 'Last Seen', 'Actions'],
  actionOptions = defaultActionOptions,
}: AdminUsersTableProps) {
  const rows = records.map((record) => {
    const statusColorMap: Record<UserRecord['status'], string> = {
      Active: 'green',
      Suspended: 'red',
      Pending: 'orange',
    }
    return [
      <Stack key={`${record.id}-user`} gap={0} minW="170px">
        <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="xs">{record.fullName}</Text>
        <Text fontSize="10px" color="gray.500">{record.id}</Text>
      </Stack>,
      <Text key={`${record.id}-email`} fontSize="xs" color="gray.700" minW="180px">{record.email}</Text>,
      <Badge key={`${record.id}-role`} variant="outline" colorPalette="blue" size="sm" fontSize="10px">
        {record.role}
      </Badge>,
      <Flex key={`${record.id}-controller`} align="center" gap={1.5}>
        <Icon as={UserCog} boxSize={3.5} color="gray.500" />
        <Text fontSize="xs" color="gray.700">{record.controllerType}</Text>
      </Flex>,
      <Badge key={`${record.id}-status`} colorPalette={statusColorMap[record.status]} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {record.status}
      </Badge>,
      <Text key={`${record.id}-lastSeen`} fontSize="xs" color="gray.700">{record.lastSeen}</Text>,
      <Box key={`${record.id}-actions`} minW="64px">
        <LymnconActionMenu actions={actionOptions} />
      </Box>,
    ]
  })

  return <LymnconTable columns={columns} rows={rows} />
}
