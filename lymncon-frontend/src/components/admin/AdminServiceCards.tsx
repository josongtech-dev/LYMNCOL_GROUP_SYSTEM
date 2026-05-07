import { SimpleGrid, Stack, Text, Flex, Icon, Box } from '@chakra-ui/react'
import { ArrowRight, Zap, CheckCircle2, AlertCircle, Calendar } from 'lucide-react'
import {
  BRAND_COLORS,
  LymnconBadge,
  LymnconCard,
  LymnconButton,
} from '../../lymncon_component'

const services = [
  {
    title: 'Project Allocation',
    description: 'Assign contractors, finance, and legal teams to new client projects.',
    status: 'High activity',
    statusColor: 'orange',
    icon: Zap,
  },
  {
    title: 'Contractor Operations',
    description: 'Track stage plans, field updates, and delivery commitments per site.',
    status: 'Stable',
    statusColor: 'green',
    icon: CheckCircle2,
  },
  {
    title: 'Finance & Escrow',
    description: 'Review escrow status, phased payment releases, and reconciliation logs.',
    status: 'Attention needed',
    statusColor: 'red',
    icon: AlertCircle,
  },
  {
    title: 'Legal & Compliance',
    description: 'Manage contracts, approvals, and compliance checks before disbursements.',
    status: 'On schedule',
    statusColor: 'blue',
    icon: Calendar,
  },
]

export function AdminServiceCards() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="100%">
      {services.map((service) => (
        <LymnconCard key={service.title} variant="simple" _hover={{ borderColor: BRAND_COLORS.blue, boxShadow: 'md' }}>
          <Stack gap={4}>
            <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
              <Flex align="center" gap={3}>
                <Box p={2} bg="blue.50" color={BRAND_COLORS.blue} borderRadius="lg">
                  <Icon as={service.icon} boxSize={5} />
                </Box>
                <Text fontWeight="800" color={BRAND_COLORS.blue} fontSize={{ base: 'sm', md: 'md' }}>
                  {service.title}
                </Text>
              </Flex>
              <LymnconBadge colorScheme={service.statusColor}>{service.status}</LymnconBadge>
            </Flex>

            <Text color="gray.500" fontSize="sm" lineHeight="1.5">
              {service.description}
            </Text>

            <LymnconButton 
              label="Access Module"
              variant="ghost" 
              size="sm" 
              rightIcon={<Icon as={ArrowRight} boxSize={4} />}
              width="fit-content"
              p={0}
              _hover={{ bg: 'transparent', transform: 'translateX(4px)' }}
            />
          </Stack>
        </LymnconCard>
      ))}
    </SimpleGrid>
  )
}
