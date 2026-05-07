import React from 'react'
import { Box, Flex, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Filter, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import { LymnconButton, LymnconCard, LymnconInput, LymnconPagination, LymnconRowsPerPageSelect } from '../../lymncon_component'
import { BRAND_COLORS } from '../../lymncon_component'
import { AdminDashboardStructure } from './AdminDashboardStructure'

export type KpiCardDef = {
  label: string
  value: string | number
  iconBg: string
  iconColor: string
  icon: ReactNode
}

type ActionButton = {
  label: string
  icon?: React.ReactElement
  onClick: () => void
  variant?: 'solid' | 'outline' | 'ghost'
  colorScheme?: string
}

type AdminListPageTemplateProps = {
  /** Page title and subtitle shown in the header */
  title: string
  subtitle?: string
  /** KPI stat cards shown at the top */
  kpis?: KpiCardDef[]
  /** Table section title */
  sectionTitle?: string
  /** Action buttons shown in the page header (e.g. Export, Add) */
  actions?: ActionButton[]
  /** Search placeholder text */
  searchPlaceholder?: string
  /** Called when search input changes */
  onSearch?: (value: string) => void
  /** Whether to show the filter button */
  showFilter?: boolean
  /** The table (or any content) to render in the card */
  children: ReactNode
  /** Pagination props */
  totalItems: number
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (size: number) => void
  pageSizeOptions?: number[]
}

/**
 * Reusable template for all admin list/table pages.
 * Handles: page header + actions, KPI cards, search/filter bar,
 * rows-per-page selector, paginated table slot, and pagination footer.
 *
 * Usage:
 *   <AdminListPageTemplate title="Users" kpis={[...]} totalItems={...} ...>
 *     <AdminUsersTable records={paginatedRecords} />
 *   </AdminListPageTemplate>
 */
export function AdminListPageTemplate({
  title,
  subtitle,
  kpis,
  sectionTitle,
  actions,
  searchPlaceholder = 'Search...',
  onSearch,
  showFilter = true,
  children,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [15, 25, 35, 50, 100],
}: AdminListPageTemplateProps) {
  return (
    <AdminDashboardStructure>
      {/* Page header */}
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              {title}
            </Text>
            {subtitle && (
              <Text color="gray.500" fontSize="sm">{subtitle}</Text>
            )}
          </Stack>

          {actions && actions.length > 0 && (
            <Flex gap={3} wrap="wrap">
              {actions.map((action) => (
                <LymnconButton
                  key={action.label}
                  label={action.label}
                  variant={action.variant ?? 'solid'}
                  size="sm"
                  leftIcon={action.icon}
                  onClick={action.onClick}
                />
              ))}
            </Flex>
          )}
        </Flex>
      </Box>

      {/* KPI cards */}
      {kpis && kpis.length > 0 && (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
          {kpis.map((kpi) => (
            <LymnconCard key={kpi.label} variant="simple" py={4} px={5}>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">
                    {kpi.label}
                  </Text>
                  <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>
                    {kpi.value}
                  </Text>
                </Box>
                <Box p={3} bg={kpi.iconBg} color={kpi.iconColor} borderRadius="xl">
                  {kpi.icon}
                </Box>
              </Flex>
            </LymnconCard>
          ))}
        </SimpleGrid>
      )}

      {/* Main table card */}
      <LymnconCard>
        <Stack gap={5}>
          {/* Card header: title + search/filter */}
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            {sectionTitle && (
              <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
                {sectionTitle}
              </Text>
            )}
            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              {onSearch && (
                <Box position="relative" flex={1}>
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={1}
                    color="gray.400"
                  >
                    <Icon as={Search} boxSize={4} />
                  </Box>
                  <LymnconInput
                    placeholder={searchPlaceholder}
                    pl={9}
                    size="sm"
                    w={{ base: '100%', md: '280px' }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
                  />
                </Box>
              )}
              {showFilter && (
                <LymnconButton
                  label="Filter"
                  variant="outline"
                  size="sm"
                  leftIcon={<Icon as={Filter} boxSize={4} />}
                />
              )}
            </Flex>
          </Flex>

          {/* Rows per page selector */}
          <LymnconRowsPerPageSelect
            value={itemsPerPage}
            onChange={(size) => {
              onItemsPerPageChange(size)
              onPageChange(1)
            }}
            options={pageSizeOptions}
          />

          {/* Injected table */}
          {children}

          {/* Pagination */}
          <LymnconPagination
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            onItemsPerPageChange={(size) => {
              onItemsPerPageChange(size)
              onPageChange(1)
            }}
            pageSizeOptions={pageSizeOptions}
            showPageSizeSelector={false}
          />
        </Stack>
      </LymnconCard>
    </AdminDashboardStructure>
  )
}
