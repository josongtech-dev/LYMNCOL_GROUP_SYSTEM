import { Stack, Text } from '@chakra-ui/react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import { BRAND_COLORS, LymnconCard, LymnconTable } from '../lymncon_component'

type AdminModulePageProps = {
  title: string
  description: string
}

export function AdminModulePage({ title, description }: AdminModulePageProps) {
  return (
    <AdminDashboardStructure>
      <LymnconCard>
        <Stack gap={3}>
          <Text fontSize="2xl" fontWeight="bold" color={BRAND_COLORS.blue}>
            {title}
          </Text>
          <Text color="gray.600">{description}</Text>
        </Stack>
      </LymnconCard>

      <LymnconCard>
        <Stack gap={3}>
          <Text fontWeight="bold" color={BRAND_COLORS.blue}>
            {title} Activity Snapshot
          </Text>
          <LymnconTable
            columns={['Date', 'Reference', 'Action', 'Status']}
            rows={[
              ['2026-05-01', 'REF-1028', `New ${title.toLowerCase()} request received`, 'Open'],
              ['2026-05-01', 'REF-1022', `${title} review completed`, 'Completed'],
              ['2026-04-30', 'REF-1019', `${title} approval queued`, 'Pending'],
            ]}
          />
        </Stack>
      </LymnconCard>
    </AdminDashboardStructure>
  )
}
