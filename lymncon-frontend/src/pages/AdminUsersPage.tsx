import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { Users, UserCheck, UserCog, ShieldAlert, Search, Filter, Download, Plus, Eye, Flag, Trash2 } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import { AdminUsersTable, type UserRecord } from '../components/admin/AdminUsersTable'
import type { LymnconActionItem } from '../lymncon_component/LymnconActionMenu'
import {
  BRAND_COLORS,
  LymnconButton,
  LymnconCard,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
} from '../lymncon_component'

export function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: UserRecord[] = useMemo(() => {
    const seed: UserRecord[] = [
      {
        id: 'USR-001',
        fullName: 'LYMNCOL Admin Controller',
        email: 'admin@lymncol-demo.com',
        role: 'Super Admin',
        controllerType: 'Platform Control',
        status: 'Active',
        lastSeen: 'Now',
      },
      {
        id: 'USR-002',
        fullName: 'Grace Njeri',
        email: 'grace.n@lymncol-demo.com',
        role: 'Compliance Admin',
        controllerType: 'Compliance Control',
        status: 'Active',
        lastSeen: 'Today 18:40',
      },
      {
        id: 'USR-003',
        fullName: 'Patrick Oloo',
        email: 'patrick.o@lymncol-demo.com',
        role: 'Finance Admin',
        controllerType: 'Finance Control',
        status: 'Pending',
        lastSeen: 'Today 16:22',
      },
    ]

    const roles = ['Operations Admin', 'Compliance Admin', 'Finance Admin', 'Support Admin']
    const controllers = ['Platform Control', 'Compliance Control', 'Finance Control', 'Support Control']
    const statuses: UserRecord['status'][] = ['Active', 'Suspended', 'Pending']
    const generated = Array.from({ length: 57 }, (_, index) => ({
      id: `USR-${(index + 4).toString().padStart(3, '0')}`,
      fullName: `Controller ${index + 4}`,
      email: `controller${index + 4}@lymncol-demo.com`,
      role: roles[index % roles.length],
      controllerType: controllers[index % controllers.length],
      status: statuses[index % statuses.length],
      lastSeen: `${(index % 28) + 1} Apr 2026`,
    }))
    return [...seed, ...generated]
  }, [])

  const totalPages = Math.max(1, Math.ceil(records.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedRecords = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage
    return records.slice(start, start + itemsPerPage)
  }, [itemsPerPage, records, safePage])

  const userActionOptions: LymnconActionItem[] = [
    { label: 'View Profile', value: 'view-profile', icon: <Icon as={Eye} boxSize={3.5} /> },
    { label: 'Suspend', value: 'suspend', icon: <Icon as={ShieldAlert} boxSize={3.5} /> },
    { label: 'Flag', value: 'flag', icon: <Icon as={Flag} boxSize={3.5} /> },
    { label: 'Delete', value: 'delete', icon: <Icon as={Trash2} boxSize={3.5} /> },
  ]

  return (
    <AdminDashboardStructure>
      <Box mb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              Users Management
            </Text>
            <Text color="gray.500" fontSize="sm">
              Manage admin users and all system controllers with role-based governance.
            </Text>
          </Stack>
          <Flex gap={3} wrap="wrap">
            <LymnconButton
              label="Export Users"
              variant="outline"
              size="sm"
              leftIcon={<Icon as={Download} boxSize={4} />}
            />
            <LymnconButton
              label="Add User"
              size="sm"
              bg={BRAND_COLORS.gold}
              _hover={{ bg: BRAND_COLORS.blue }}
              leftIcon={<Icon as={Plus} boxSize={4} />}
            />
          </Flex>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Total Users</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>248</Text>
            </Box>
            <Box p={3} bg="blue.50" color="blue.500" borderRadius="xl"><Icon as={Users} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Active</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>198</Text>
            </Box>
            <Box p={3} bg="green.50" color="green.500" borderRadius="xl"><Icon as={UserCheck} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Controllers</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>86</Text>
            </Box>
            <Box p={3} bg="purple.50" color="purple.500" borderRadius="xl"><Icon as={UserCog} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
        <LymnconCard variant="simple" py={4} px={5}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Suspended</Text>
              <Text fontSize="2xl" fontWeight="800" color={BRAND_COLORS.blue} mt={1}>12</Text>
            </Box>
            <Box p={3} bg="red.50" color="red.500" borderRadius="xl"><Icon as={ShieldAlert} boxSize={6} /></Box>
          </Flex>
        </LymnconCard>
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              User Directory
            </Text>

            <Flex gap={3} w={{ base: '100%', md: 'auto' }}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput
                  placeholder="Search users..."
                  pl={9}
                  size="sm"
                  w={{ base: '100%', md: '280px' }}
                />
              </Box>
              <LymnconButton
                label="Filter"
                variant="outline"
                size="sm"
                leftIcon={<Icon as={Filter} boxSize={4} />}
              />
            </Flex>
          </Flex>

          <LymnconRowsPerPageSelect
            value={itemsPerPage}
            onChange={(size) => {
              setItemsPerPage(size)
              setCurrentPage(1)
            }}
            options={[15, 25, 35, 50, 100]}
          />

          <AdminUsersTable records={paginatedRecords} actionOptions={userActionOptions} />

          <LymnconPagination
            totalItems={records.length}
            currentPage={safePage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(size) => {
              setItemsPerPage(size)
              setCurrentPage(1)
            }}
            pageSizeOptions={[15, 25, 35, 50, 100]}
            showPageSizeSelector={false}
          />
        </Stack>
      </LymnconCard>
    </AdminDashboardStructure>
  )
}
