import { Stack, Text } from '@chakra-ui/react'
import { BRAND_COLORS, LymnconCard, LymnconTable } from '../../lymncon_component'

export function AdminActivitySection() {
  return (
    <LymnconCard>
      <Stack gap={3}>
        <Text fontWeight="bold" color={BRAND_COLORS.blue}>
          Recent System Activity
        </Text>
        <LymnconTable
          columns={[
            { label: 'Date', display: { base: 'none', md: 'table-cell' } },
            { label: 'Module', display: { base: 'none', sm: 'table-cell' } },
            'Action',
            'Status'
          ]}
          rows={[
            ['2026-05-01', 'Projects', 'New client project allocated to contractor', 'Completed'],
            ['2026-05-01', 'Finance', 'Milestone escrow release batch approved', 'Completed'],
            ['2026-04-30', 'Legal Team', 'Contract compliance review queued', 'Pending'],
            ['2026-04-30', 'Site Monitoring', 'GPS mismatch flagged on uploaded image', 'Completed'],
          ]}
        />
      </Stack>
    </LymnconCard>
  )
}
