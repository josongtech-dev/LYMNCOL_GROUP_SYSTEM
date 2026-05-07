import { useState } from 'react'
import { Box, Heading, Stack, Text, Icon, Flex } from '@chakra-ui/react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard,
  Users, 
  ChevronDown,
  BriefcaseBusiness,
  Wallet,
  Scale,
  UserRound,
  FolderKanban,
  Settings,
  BarChart3,
  LifeBuoy,
  Activity,
  ShieldAlert,
  MapPinned,
  Video,
  HandCoins,
  Milestone,
  FileSearch
} from 'lucide-react'
import { BRAND_COLORS } from '../../lymncon_component'
import type { LucideIcon } from 'lucide-react'
import { useThemeMode } from '../../context/useThemeMode'

type NavItemType = {
  name: string
  icon: LucideIcon
  to?: string
  children?: { name: string; to: string }[]
}

const navGroups = [
  {
    title: 'Main',
    items: [
      { name: 'Overview', icon: LayoutDashboard, to: '/admin/overview' },
      {
        name: 'Applicants',
        icon: Users,
        children: [
          { name: 'Finance', to: '/admin/applicants/finance' },
          { name: 'Contractors', to: '/admin/applicants/contractors' },
          { name: 'Legal', to: '/admin/applicants/legal' },
          { name: 'Clients', to: '/admin/applicants/clients' },
        ],
      },
      { name: 'Contractors', icon: BriefcaseBusiness, to: '/admin/contractors' },
      { name: 'Users', icon: Users, to: '/admin/users' },
      { name: 'Finance', icon: Wallet, to: '/admin/finance' },
      { name: 'Legal Team', icon: Scale, to: '/admin/legal-team' },
      { name: 'Clients', icon: UserRound, to: '/admin/clients' },
      { name: 'Projects', icon: FolderKanban, to: '/admin/projects' },
      { name: 'Settings', icon: Settings, to: '/admin/settings' },
      { name: 'Analytics', icon: BarChart3, to: '/admin/analytics' },
      { name: 'Help Desk', icon: LifeBuoy, to: '/admin/help-desk' },
      { name: 'Activities', icon: Activity, to: '/admin/activities' },
      { name: 'Security', icon: ShieldAlert, to: '/admin/security' },
      { name: 'Portal Settings', icon: Settings, to: '/admin/portal-settings' },
    ],
  },
  {
    title: 'Construction Controls',
    items: [
      { name: 'Live Site Monitor', icon: Video, to: '/admin/live-site-monitor' },
      { name: 'GPS Verification', icon: MapPinned, to: '/admin/gps-verification' },
      { name: 'Escrow Releases', icon: HandCoins, to: '/admin/escrow-releases' },
      { name: 'Milestone Tracking', icon: Milestone, to: '/admin/milestone-tracking' },
      { name: 'Compliance & Audits', icon: FileSearch, to: '/admin/compliance-audits' },
    ],
  },
]

const NavItem = ({ item }: { item: NavItemType }) => {
  const location = useLocation()
  const { themeMode } = useThemeMode()
  const isDark = themeMode === 'dark'
  const hasActiveChild = !!item.children?.some((child) => location.pathname === child.to)
  const [isOpen, setIsOpen] = useState(hasActiveChild)
  const isCollapsible = !!item.children
  const isActive = !!item.to && location.pathname === item.to

  const navItemContent = (
    <Flex
      align="center"
      justify="space-between"
      gap={3}
      px={4}
      py={2.5}
      borderRadius="xl"
      cursor="pointer"
      bg={isActive || hasActiveChild ? `${BRAND_COLORS.blue}20` : 'transparent'}
      color={isActive || hasActiveChild ? BRAND_COLORS.gold : isDark ? 'gray.200' : 'gray.500'}
      _hover={{ bg: isDark ? 'whiteAlpha.100' : 'gray.50', color: BRAND_COLORS.gold }}
      transition="all 0.2s"
      onClick={() => {
        if (isCollapsible) setIsOpen((current) => !current)
      }}
    >
      <Flex align="center" gap={3}>
        <Icon as={item.icon} boxSize={5} />
        <Text fontSize="sm" fontWeight={isActive || hasActiveChild ? '700' : '500'}>
          {item.name}
        </Text>
      </Flex>
      {item.children && (
        <Icon
          as={ChevronDown}
          boxSize={4}
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
          transition="transform 0.2s ease"
        />
      )}
    </Flex>
  )

  return (
    <Box>
      {item.to ? (
        <NavLink to={item.to} style={{ textDecoration: 'none' }}>
          {navItemContent}
        </NavLink>
      ) : (
        navItemContent
      )}

      {item.children && isOpen && (
        <Stack gap={1} mt={1} pl={12}>
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: location.pathname === child.to ? BRAND_COLORS.gold : isDark ? '#CBD5E1' : '#6B7280',
                padding: '4px 8px',
                borderRadius: '6px',
                textDecoration: 'none',
                background: location.pathname === child.to ? (isDark ? 'rgba(201, 152, 36, 0.14)' : '#EFF6FF') : 'transparent',
              }}
            >
              {child.name}
            </NavLink>
          ))}
        </Stack>
      )}
    </Box>
  )
}

export function AdminSidebar() {
  const { themeMode } = useThemeMode()
  const isDark = themeMode === 'dark'

  return (
    <Stack gap={0} h="100%">
      <Box 
        px={4} 
        py={6} 
        position="sticky" 
        top={0} 
        bg={isDark ? '#0F172A' : '#F5F8FC'} 
        zIndex={10}
        borderBottom="1px solid"
        borderColor={isDark ? 'whiteAlpha.200' : 'gray.100'}
        mb={4}
      >
        <Heading size="md" color={BRAND_COLORS.blue} fontWeight="800">
          LYMNCOL <Text as="span" color={BRAND_COLORS.gold}>ADMIN</Text>
        </Heading>
        <Text fontSize="xs" color="gray.400" fontWeight="bold" mt={1}>
          CONSTRUCTION MANAGEMENT
        </Text>
      </Box>

      <Stack 
        gap={6} 
        px={0} 
        pb={8} 
        overflowY="auto" 
        flex={1}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(1, 74, 141, 0.1)',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            background: 'rgba(1, 74, 141, 0.3)',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: BRAND_COLORS.gold,
          },
        }}
      >
        {navGroups.map((group) => (
          <Box key={group.title}>
            <Text 
              fontSize="10px" 
              fontWeight="800" 
              color={isDark ? 'gray.500' : 'gray.400'} 
              px={4} 
              mb={2} 
              letterSpacing="widest"
              textTransform="uppercase"
            >
              {group.title}
            </Text>
            <Stack gap={1}>
              {group.items.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Box px={4} mt="auto" pt={8}>
        <Box 
          p={4} 
          bg={BRAND_COLORS.blue} 
          borderRadius="xl" 
          color="white"
          boxShadow="xl"
        >
          <Text fontSize="xs" fontWeight="bold" opacity={0.8}>System Status</Text>
          <Text fontSize="sm" fontWeight="bold">Operational</Text>
          <Box w="100%" h="2px" bg="whiteAlpha.300" my={2} />
          <Text fontSize="10px">v1.0.0 First Stable Release</Text>
          <Text fontSize="10px" opacity={0.85} mt={1}>Release Date: 5 May 2026</Text>
        </Box>
      </Box>
    </Stack>
  )
}
