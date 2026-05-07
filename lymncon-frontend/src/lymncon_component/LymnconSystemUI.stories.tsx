import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Stack, Text } from '@chakra-ui/react'
import {
  LymnconAlert,
  LymnconBadge,
  LymnconBreadcrumb,
  LymnconButton,
  LymnconCard,
  LymnconCheckbox,
  LymnconInput,
  LymnconLink,
  LymnconModalPlaceholder,
  LymnconProgress,
  LymnconSelect,
  LymnconTable,
  LymnconTextarea,
} from '.'

const meta = {
  title: 'Lymncon/System UI Showcase',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Box p={6} bg="gray.50">
      <Stack gap={5}>
        <LymnconBreadcrumb
          items={[
            { label: 'Dashboard', href: '#' },
            { label: 'Projects', href: '#' },
            { label: 'Site A - Progress' },
          ]}
        />
        <LymnconAlert title="Progress report uploaded successfully" status="success" />
        <LymnconCard>
          <Stack gap={3}>
            <Text fontWeight="semibold">Project Form Controls</Text>
            <LymnconInput placeholder="Project title" />
            <LymnconSelect
              options={[
                { label: 'Foundation', value: 'foundation' },
                { label: 'Masonry', value: 'masonry' },
                { label: 'Roofing', value: 'roofing' },
              ]}
            />
            <LymnconTextarea placeholder="Progress note..." />
            <LymnconCheckbox label="Mark as client-visible update" />
            <Stack direction="row" gap={3}>
              <LymnconButton label="Save Draft" variant="outline" />
              <LymnconButton label="Publish Update" />
            </Stack>
          </Stack>
        </LymnconCard>
        <Stack direction="row" gap={3}>
          <LymnconBadge>Phase 2</LymnconBadge>
          <LymnconBadge colorPalette="green">On Track</LymnconBadge>
        </Stack>
        <LymnconProgress value={62} />
        <LymnconTable
          columns={['Date', 'Task', 'Status']}
          rows={[
            ['2026-04-20', 'Pour slab', 'Done'],
            ['2026-04-24', 'Wall blocks', 'In Progress'],
            ['2026-04-29', 'Roof prep', 'Pending'],
          ]}
        />
        <LymnconModalPlaceholder
          title="Client Approval Modal"
          message="Approval and payout release modal will be connected to workflow logic."
        />
        <LymnconLink label="Open project docs" href="/documentations/storybook.md" />
      </Stack>
    </Box>
  ),
}
