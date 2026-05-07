import { Stack, Text } from '@chakra-ui/react'
import {
  BRAND_COLORS,
  LymnconAlert,
  LymnconButton,
  LymnconCard,
  LymnconTextarea,
} from '../../lymncon_component'

export function AdminNoticePanel() {
  return (
    <LymnconCard>
      <Stack gap={3}>
        <Text fontWeight="bold" color={BRAND_COLORS.blue}>
          Broadcast Update
        </Text>
        <LymnconAlert
          title="Send updates to contractors, clients, legal, and finance teams."
          status="info"
        />
        <LymnconTextarea placeholder="Type operational update for all stakeholders..." minH="120px" />
        <LymnconButton label="Post Update" size="sm" />
      </Stack>
    </LymnconCard>
  )
}
