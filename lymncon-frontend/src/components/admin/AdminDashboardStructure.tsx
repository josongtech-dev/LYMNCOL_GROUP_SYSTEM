import { useState } from 'react'
import { Grid, GridItem, Stack, Box, Icon, IconButton, Flex } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'
import { AdminActivitySection } from './AdminActivitySection'
import { AdminKpiGrid } from './AdminKpiGrid'
import { AdminNoticePanel } from './AdminNoticePanel'
import { AdminServiceCards } from './AdminServiceCards'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'
import { AdminFooter } from './AdminFooter'
import { useThemeMode } from '../../context/useThemeMode'
import { BRAND_COLORS } from '../../lymncon_component'

type AdminDashboardStructureProps = {
  children?: ReactNode
}

export function AdminDashboardStructure({ children }: AdminDashboardStructureProps) {
  const { themeMode } = useThemeMode()
  const isDark = themeMode === 'dark'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [topbarExpanded, setTopbarExpanded] = useState(false)

  const sidebarBg   = isDark ? '#0F172A' : '#F5F8FC'
  const pageBg      = isDark ? '#0B1220' : '#F8FAFC'
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'
  const topbarBg    = isDark ? 'rgba(11, 18, 32, 0.88)' : 'rgba(245, 248, 252, 0.88)'
  const footerBg    = isDark ? 'rgba(11, 18, 32, 0.88)' : 'rgba(255,255,255,0.88)'

  return (
    <Box minH="100vh" bg={pageBg} position="relative" w="100%" overflowX="hidden">
      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <Box
          display={{ base: 'block', lg: 'none' }}
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          zIndex={40}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile sidebar drawer ── */}
      <Box
        display={{ base: 'block', lg: 'none' }}
        position="fixed"
        top={0}
        left={0}
        h="100vh"
        w="260px"
        bg={sidebarBg}
        borderRight="1px solid"
        borderColor={borderColor}
        zIndex={50}
        transform={drawerOpen ? 'translateX(0)' : 'translateX(-100%)'}
        transition="transform 0.28s cubic-bezier(0.4,0,0.2,1)"
        overflowY="auto"
      >
        {/* Close button inside drawer */}
        <Box position="absolute" top={3} right={3}>
          <IconButton
            aria-label="Close menu"
            size="sm"
            variant="ghost"
            borderRadius="full"
            onClick={() => setDrawerOpen(false)}
          >
            <Icon as={X} boxSize={5} color={isDark ? 'gray.200' : 'gray.600'} />
          </IconButton>
        </Box>
        <AdminSidebar />
      </Box>

      <Grid templateColumns={{ base: '1fr', lg: '240px 1fr' }} gap={0} minH="100vh">
        {/* ── Desktop sidebar ── */}
        <GridItem
          display={{ base: 'none', lg: 'block' }}
          position="sticky"
          top={0}
          h="100vh"
          borderRight="1px solid"
          borderColor={borderColor}
          bg={sidebarBg}
        >
          <AdminSidebar />
        </GridItem>

        {/* ── Main content column ── */}
        <GridItem display="flex" flexDirection="column" minW={0} w="100%">
          <Stack gap={0} w="100%">
            {/* Topbar Container */}
            <Box
              position="sticky"
              top={0}
              bg={topbarBg}
              backdropFilter="blur(14px)"
              zIndex={20}
              borderBottom="1px solid"
              borderColor={borderColor}
              py={{ base: 1.5, lg: 4 }}
              px={{ base: 2, lg: 6 }}
              w="100%"
            >
              <Flex align="flex-start" gap={{ base: 1, lg: 0 }} w="100%">
                {/* Hamburger only visible on mobile */}
                <IconButton
                  aria-label="Open navigation menu"
                  size="sm"
                  variant="ghost"
                  borderRadius="full"
                  onClick={() => setDrawerOpen(true)}
                  display={{ base: 'flex', lg: 'none' }}
                  minW="32px"
                  h="32px"
                  mt={1}
                >
                  <Icon as={Menu} boxSize={5} color={isDark ? 'gray.200' : BRAND_COLORS.blue} />
                </IconButton>

                <Box flex={1} minW={0} pt={1}>
                  <AdminTopbar isExpanded={topbarExpanded} />
                </Box>

                {/* Mobile Topbar Toggle */}
                <IconButton
                  aria-label="Toggle header actions"
                  size="xs"
                  variant="ghost"
                  borderRadius="full"
                  onClick={() => setTopbarExpanded(!topbarExpanded)}
                  display={{ base: 'flex', md: 'none' }}
                  minW="24px"
                  ml={0.5}
                  mt={2}
                >
                  <Icon as={topbarExpanded ? ChevronUp : ChevronDown} boxSize={4} color="gray.400" />
                </IconButton>
              </Flex>
            </Box>

            {/* Page content */}
            <Box p={{ base: 2, md: 6 }} pb={{ base: 24, md: 20 }} w="100%">
              <Stack gap={6}>
                {children ?? (
                  <>
                    <AdminKpiGrid />
                    <AdminServiceCards />
                    <Grid templateColumns={{ base: '1fr', xl: '2fr 1fr' }} gap={6} w="100%">
                      <GridItem><AdminActivitySection /></GridItem>
                      <GridItem><AdminNoticePanel /></GridItem>
                    </Grid>
                  </>
                )}
              </Stack>
            </Box>

            {/* Fixed footer */}
            <Box
              position="fixed"
              left={{ base: 0, lg: '240px' }}
              right={0}
              bottom={0}
              bg={footerBg}
              backdropFilter="blur(16px)"
              zIndex={30}
              borderTop="1px solid"
              borderColor={borderColor}
            >
              <AdminFooter />
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  )
}
