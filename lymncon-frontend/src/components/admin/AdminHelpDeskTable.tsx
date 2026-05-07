import { Box, Stack, Text, Badge, Icon } from '@chakra-ui/react'
import { Eye, Flag, Mail, MessageSquareWarning, Trash2 } from 'lucide-react'
import {
  BRAND_COLORS,
  LymnconActionMenu,
  LymnconTable,
} from '../../lymncon_component'
import type { LymnconActionItem } from '../../lymncon_component/LymnconActionMenu'

export type HelpDeskTicket = {
  id: string
  subject: string
  requester: string
  channel: 'Client' | 'Contractor' | 'Internal'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Open' | 'In Progress' | 'Resolved'
  updatedAt: string
}

type AdminHelpDeskTableProps = {
  records: HelpDeskTicket[]
  columns?: string[]
  actionOptions?: LymnconActionItem[]
}

const defaultActionOptions: LymnconActionItem[] = [
  { label: 'Track', value: 'track', icon: <Icon as={Eye} boxSize={3.5} /> },
  { label: 'Respond', value: 'respond', icon: <Icon as={Mail} boxSize={3.5} /> },
  { label: 'Escalate', value: 'escalate', icon: <Icon as={MessageSquareWarning} boxSize={3.5} /> },
  { label: 'Flag', value: 'flag', icon: <Icon as={Flag} boxSize={3.5} /> },
  { label: 'Delete', value: 'delete', icon: <Icon as={Trash2} boxSize={3.5} /> },
]

export function AdminHelpDeskTable({
  records,
  columns = ['Ticket', 'Requester', 'Channel', 'Priority', 'Status', 'Updated', 'Actions'],
  actionOptions = defaultActionOptions,
}: AdminHelpDeskTableProps) {
  const getPriorityBadge = (priority: HelpDeskTicket['priority']) => {
    const map: Record<HelpDeskTicket['priority'], { color: string }> = {
      Low: { color: 'green' },
      Medium: { color: 'blue' },
      High: { color: 'orange' },
      Critical: { color: 'red' },
    }
    return (
      <Badge colorPalette={map[priority].color} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {priority}
      </Badge>
    )
  }

  const getStatusBadge = (status: HelpDeskTicket['status']) => {
    const map: Record<HelpDeskTicket['status'], { color: string }> = {
      Open: { color: 'orange' },
      'In Progress': { color: 'blue' },
      Resolved: { color: 'green' },
    }
    return (
      <Badge colorPalette={map[status].color} variant="subtle" px={2} py={1} borderRadius="full" fontSize="10px">
        {status}
      </Badge>
    )
  }

  const rows = records.map((ticket) => [
    <Stack key={`${ticket.id}-ticket`} gap={0} minW="190px">
      <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="xs">{ticket.subject}</Text>
      <Text fontSize="10px" color="gray.500">{ticket.id}</Text>
    </Stack>,
    <Text key={`${ticket.id}-requester`} fontSize="xs" color="gray.700" minW="150px">
      {ticket.requester}
    </Text>,
    <Badge key={`${ticket.id}-channel`} variant="outline" colorPalette="blue" size="sm" fontSize="10px">
      {ticket.channel}
    </Badge>,
    getPriorityBadge(ticket.priority),
    getStatusBadge(ticket.status),
    <Text key={`${ticket.id}-updated`} fontSize="xs" color="gray.700" minW="120px">
      {ticket.updatedAt}
    </Text>,
    <Box key={`${ticket.id}-actions`} minW="64px">
      <LymnconActionMenu actions={actionOptions} />
    </Box>,
  ])

  return <LymnconTable columns={columns} rows={rows} />
}
