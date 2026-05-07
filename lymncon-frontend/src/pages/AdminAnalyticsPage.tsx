import { Grid, GridItem, Stack, Text, Box, Flex, Icon, SimpleGrid } from '@chakra-ui/react'
import { BarChart3, TrendingUp, Clock3, CheckCircle2, Search, Filter, Download } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import {
  BRAND_COLORS,
  LymnconButton,
  LymnconCard,
  LymnconInput,
  LymnconTable,
} from '../lymncon_component'

const performanceRows = [
  ['Finance', 'Escrow Releases', '94%', '+8.2%'],
  ['Contractors', 'Milestone Delivery', '88%', '+5.4%'],
  ['Legal Team', 'Case Resolution', '91%', '+6.1%'],
  ['Clients', 'Project Activation', '86%', '+4.7%'],
]

const topProjectsRows = [
  ['Westlands Heights', 'Muriithi Holdings', 'In Progress', '76%'],
  ['Ocean View Villas', 'R&K Estates', 'Planning', '12%'],
  ['Kisumu Business Park', 'Ngetich Properties', 'Completed', '100%'],
  ['Nakuru Residency', 'Client Org 22', 'In Progress', '63%'],
]

export function AdminAnalyticsPage() {
  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Analytics
            </Text>
            <Text color="gray.500" fontSize="sm">
              Review platform performance across projects, teams, and operational workflows.
            </Text>
          </Stack>
          <Flex gap={3} wrap="wrap">
            <LymnconButton
              label="Export Insights"
              variant="outline"
              size="sm"
              leftIcon={<Icon as={Download} boxSize={4} />}
            />
          </Flex>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Total Insights Tracked</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>12,480</Text>
            </Box>
            <Box p={3} bg="blue.50" color="blue.500" borderRadius="xl">
              <Icon as={BarChart3} boxSize={6} />
            </Box>
          </Flex>
        </LymnconCard>

        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Growth Trend</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>+18.4%</Text>
            </Box>
            <Box p={3} bg="green.50" color="green.500" borderRadius="xl">
              <Icon as={TrendingUp} boxSize={6} />
            </Box>
          </Flex>
        </LymnconCard>

        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Avg. Cycle Time</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>9.2 days</Text>
            </Box>
            <Box p={3} bg="orange.50" color="orange.500" borderRadius="xl">
              <Icon as={Clock3} boxSize={6} />
            </Box>
          </Flex>
        </LymnconCard>

        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Completion Quality</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>92%</Text>
            </Box>
            <Box p={3} bg="purple.50" color="purple.500" borderRadius="xl">
              <Icon as={CheckCircle2} boxSize={6} />
            </Box>
          </Flex>
        </LymnconCard>
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              Team Performance Overview
            </Text>
            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput placeholder="Search metric..." pl={9} size="sm" w={{ base: '100%', md: '280px' }} />
              </Box>
              <LymnconButton label="Filter" variant="outline" size="sm" leftIcon={<Icon as={Filter} boxSize={4} />} />
            </Flex>
          </Flex>

          <LymnconTable
            columns={['Module', 'Metric', 'Current Score', 'Trend']}
            rows={performanceRows}
          />
        </Stack>
      </LymnconCard>

      <Grid templateColumns={{ base: '1fr', xl: '1.2fr 1fr' }} gap={6}>
        <GridItem>
          <LymnconCard>
            <Stack gap={4}>
              <Text fontWeight="bold" color={BRAND_COLORS.blue}>Top Active Projects</Text>
              <LymnconTable
                columns={['Project', 'Client', 'Stage', 'Progress']}
                rows={topProjectsRows}
              />
            </Stack>
          </LymnconCard>
        </GridItem>

        <GridItem>
          <LymnconCard>
            <Stack gap={4}>
              <Text fontWeight="bold" color={BRAND_COLORS.blue}>Insights Summary</Text>
              <Box bg="blue.50" border="1px solid" borderColor="blue.100" borderRadius="lg" p={4}>
                <Text fontSize="sm" color="gray.700">
                  Finance and Legal modules show consistent improvement this cycle, while planning-stage projects need
                  closer tracking on kickoff readiness.
                </Text>
              </Box>
              <Box bg="green.50" border="1px solid" borderColor="green.100" borderRadius="lg" p={4}>
                <Text fontSize="sm" color="gray.700">
                  Completed projects achieved strong closure quality with low exception rates in the latest review.
                </Text>
              </Box>
              <Box bg="orange.50" border="1px solid" borderColor="orange.100" borderRadius="lg" p={4}>
                <Text fontSize="sm" color="gray.700">
                  In-progress portfolio should prioritize milestone approvals to maintain current growth velocity.
                </Text>
              </Box>
            </Stack>
          </LymnconCard>
        </GridItem>
      </Grid>
    </AdminDashboardStructure>
  )
}
