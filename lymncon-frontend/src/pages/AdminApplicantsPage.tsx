import { useMemo, useState } from 'react'
import { SimpleGrid, Stack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { Users, UserCheck, UserX, Clock, Search, Filter, Download } from 'lucide-react'
import { AdminDashboardStructure } from '../components/admin/AdminDashboardStructure'
import { AdminApplicantsTable, type ApplicantRecord } from '../components/admin/AdminApplicantsTable'
import {
  BRAND_COLORS,
  LymnconCard,
  LymnconButton,
  LymnconInput,
  LymnconPagination,
  LymnconRowsPerPageSelect,
} from '../lymncon_component'

type ApplicantCategory = 'finance' | 'contractors' | 'legal' | 'clients'

type AdminApplicantsPageProps = {
  category: ApplicantCategory
}

const categoryTitleMap: Record<ApplicantCategory, string> = {
  finance: 'Finance Applicants',
  contractors: 'Contractor Applicants',
  legal: 'Legal Applicants',
  clients: 'Client Applicants',
}

export function AdminApplicantsPage({ category }: AdminApplicantsPageProps) {
  const title = categoryTitleMap[category]
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const records: ApplicantRecord[] = useMemo(() => {
    const seed: ApplicantRecord[] = [
      {
        applicationCode: 'APP-FIN-2026-00041',
        fullName: 'Alice Nyaboke',
        email: 'alice@lymncol-demo.com',
        country: 'Kenya',
        phone: '+254 712345678',
        role: 'Finance',
        currentStatus: 'Pending',
      },
      {
        applicationCode: 'APP-CON-2026-00057',
        fullName: 'Brian Oigo',
        email: 'brian@lymncol-demo.com',
        country: 'Tanzania',
        phone: '+255 742998110',
        role: 'Contractor',
        currentStatus: 'Under Review',
      },
    ]

    const generated = Array.from({ length: 38 }, (_, index) => {
      const serial = `${(index + 58).toString().padStart(5, '0')}`
      const prefix = category.slice(0, 3).toUpperCase()
      const roleLabelMap: Record<ApplicantCategory, string> = {
        finance: 'Finance',
        contractors: 'Contractor',
        legal: 'Legal',
        clients: 'Client',
      }
      return {
        applicationCode: `APP-${prefix}-2026-${serial}`,
        fullName: `Applicant ${index + 3}`,
        email: `applicant${index + 3}@lymncol-demo.com`,
        country: index % 2 === 0 ? 'Kenya' : 'Tanzania',
        phone: index % 2 === 0 ? `+254 700${(100000 + index).toString().slice(-6)}` : `+255 740${(100000 + index).toString().slice(-6)}`,
        role: roleLabelMap[category],
        currentStatus: index % 3 === 0 ? 'Under Review' : 'Pending',
      }
    })

    return [...seed, ...generated]
  }, [category])

  const totalPages = Math.max(1, Math.ceil(records.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedRecords = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage
    return records.slice(start, start + itemsPerPage)
  }, [itemsPerPage, records, safePage])

  const stats = [
    { label: 'Total Applicants', value: '1,284', icon: Users, color: 'blue' },
    { label: 'Pending Review', value: '142', icon: Clock, color: 'orange' },
    { label: 'Approved Today', value: '28', icon: UserCheck, color: 'green' },
    { label: 'Rejected', value: '12', icon: UserX, color: 'red' },
  ]

  return (
    <AdminDashboardStructure>
      <Box mb={6}>
        <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
          <Stack gap={1} flex={1} minW="280px">
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color={BRAND_COLORS.blue} letterSpacing="tight">
              {title}
            </Text>
            <Text color="gray.500" fontSize="sm">
              Manage and review {category} intake for construction compliance and platform access.
            </Text>
          </Stack>
  
          <Flex gap={3} wrap="wrap" w={{ base: '100%', sm: 'auto' }}>
            <LymnconButton 
              label="Export PDF" 
              variant="outline" 
              size="sm" 
              leftIcon={<Icon as={Download} boxSize={4} />}
              flex={{ base: 1, sm: 'none' }}
            />
            <LymnconButton 
              label="Add New Applicant" 
              size="sm" 
              bg={BRAND_COLORS.gold}
              _hover={{ bg: BRAND_COLORS.blue }}
              flex={{ base: 1, sm: 'none' }}
            />
          </Flex>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap={4} mb={6} w="100%">
        {stats.map((stat) => (
          <LymnconCard key={stat.label} variant="simple" py={4} px={5}>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="wider">
                  {stat.label}
                </Text>
                <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="800" color={BRAND_COLORS.blue} mt={1}>
                  {stat.value}
                </Text>
              </Box>
              <Box p={3} bg={`${stat.color}.50`} color={`${stat.color}.500`} borderRadius="xl">
                <Icon as={stat.icon} boxSize={6} />
              </Box>
            </Flex>
          </LymnconCard>
        ))}
      </SimpleGrid>

      <LymnconCard>
        <Stack gap={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontWeight="bold" color={BRAND_COLORS.blue} fontSize="lg">
              Applicant Intake and Decisions
            </Text>
            
            <Flex gap={3} w={{ base: '100%', md: 'auto' }} wrap="wrap">
              <Box position="relative" flex={{ base: 1, md: 'none' }} minW={{ base: '100%', sm: '240px' }}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" zIndex={1} color="gray.400">
                  <Icon as={Search} boxSize={4} />
                </Box>
                <LymnconInput 
                  placeholder="Search applicants..." 
                  pl={9} 
                  size="sm" 
                  w="100%"
                />
              </Box>
              <LymnconButton 
                label="Filter" 
                variant="outline" 
                size="sm" 
                leftIcon={<Icon as={Filter} boxSize={4} />}
                flex={{ base: 1, md: 'none' }}
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

          <Box overflowX="auto" w="100%">
            <AdminApplicantsTable records={paginatedRecords} />
          </Box>

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
