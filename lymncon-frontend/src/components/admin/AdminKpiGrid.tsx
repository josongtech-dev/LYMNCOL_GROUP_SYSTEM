import { SimpleGrid, Stack, Text, Box, Icon, Flex } from '@chakra-ui/react'
import { TrendingUp, Building2, Wallet, MapPinned, FileCheck2 } from 'lucide-react'
import { BRAND_COLORS, LymnconCard, LymnconProgress } from '../../lymncon_component'

const kpis = [
  { label: 'Active Projects', value: '42 Projects', progress: 76, icon: Building2, color: 'blue' },
  { label: 'Escrow Balance', value: 'KES 814M', progress: 63, icon: Wallet, color: 'green' },
  { label: 'GPS Verified Updates', value: '1,284 Logs', progress: 88, icon: MapPinned, color: 'purple' },
  { label: 'Approved Milestones', value: '96 Released', progress: 52, icon: FileCheck2, color: 'orange' },
]

export function AdminKpiGrid() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4} w="100%">
      {kpis.map((kpi) => (
        <LymnconCard key={kpi.label} variant="simple">
          <Stack gap={4}>
            <Flex justify="space-between" align="flex-start">
              <Box>
                <Text fontSize={{ base: '10px', md: 'xs' }} fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="wider">
                  {kpi.label}
                </Text>
                <Text fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} fontWeight="800" color={BRAND_COLORS.blue} mt={1}>
                  {kpi.value}
                </Text>
              </Box>
              <Box p={2} bg={`${kpi.color}.50`} color={`${kpi.color}.500`} borderRadius="lg">
                <Icon as={kpi.icon} boxSize={5} />
              </Box>
            </Flex>
            
            <Box>
              <Flex justify="space-between" mb={1.5} align="center">
                <Text fontSize="10px" fontWeight="bold" color="gray.500">Target Progress</Text>
                <Flex align="center" gap={1} color="green.500">
                  <Icon as={TrendingUp} boxSize={3} />
                  <Text fontSize="10px" fontWeight="bold">{kpi.progress}%</Text>
                </Flex>
              </Flex>
              <LymnconProgress value={kpi.progress} />
            </Box>
          </Stack>
        </LymnconCard>
      ))}
    </SimpleGrid>
  )
}
