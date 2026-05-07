import { useState } from 'react'
import type { ReactNode } from 'react'
import { Box, Flex, Stack, Text, Icon, SimpleGrid, Grid } from '@chakra-ui/react'
import { CalendarDays, CheckCircle2, Eye, Mail, Phone, ShieldCheck, Trash2, UploadCloud, XCircle } from 'lucide-react'
import {
  BRAND_COLORS,
  LymnconActionMenu,
  LymnconButton,
  LymnconInput,
  LymnconSelect,
  LymnconTable,
  LymnconTextarea,
} from '../../lymncon_component'

export type ApplicantRecord = {
  applicationCode: string
  fullName: string
  email: string
  country: string
  phone: string
  role: string
  currentStatus: string
}

type AdminApplicantsTableProps = {
  records: ApplicantRecord[]
  columns?: string[]
  actionOptions?: ActionItem[]
}

const statusOptions = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Under Review', value: 'Under Review' },
]

type ActionItem = {
  label: string
  value: string
  icon?: ReactNode
}

const defaultActionOptions: ActionItem[] = [
  { label: 'Upload Documents', value: 'upload-documents', icon: <Icon as={UploadCloud} boxSize={3.5} /> },
  { label: 'View', value: 'view', icon: <Icon as={Eye} boxSize={3.5} /> },
  { label: 'Contact', value: 'contact', icon: <Icon as={Mail} boxSize={3.5} /> },
  { label: 'Schedule Meeting', value: 'schedule-meeting', icon: <Icon as={CalendarDays} boxSize={3.5} /> },
  { label: 'Confirm', value: 'confirm', icon: <Icon as={CheckCircle2} boxSize={3.5} /> },
  { label: 'Reject', value: 'reject', icon: <Icon as={XCircle} boxSize={3.5} /> },
  { label: 'Delete', value: 'delete', icon: <Icon as={Trash2} boxSize={3.5} /> },
]

const documentTypeOptions = [
  { label: 'ID / Passport Copy', value: 'id-passport' },
  { label: 'Tax Compliance', value: 'tax-compliance' },
  { label: 'Company Registration', value: 'company-registration' },
  { label: 'Legal Undertaking', value: 'legal-undertaking' },
]

export function AdminApplicantsTable({
  records,
  columns = ['App Code', 'Applicant', 'Contact', 'Status', 'Actions'],
  actionOptions = defaultActionOptions,
}: AdminApplicantsTableProps) {
  const [activeDocApplicant, setActiveDocApplicant] = useState<ApplicantRecord | null>(null)
  const [statusByCode, setStatusByCode] = useState<Record<string, string>>({})

  const rows = records.map((record) => [
    <Box key={`${record.applicationCode}-code`} display={{ base: 'none', xl: 'block' }}>
      <Text fontWeight="bold" fontSize="xs" color="gray.600">
        {record.applicationCode}
      </Text>
    </Box>,
    <Stack key={`${record.applicationCode}-name`} gap={0} minW="140px">
      <Text fontWeight="bold" color={BRAND_COLORS.blue} lineHeight="shorter" fontSize="xs">{record.fullName}</Text>
      <Text fontSize="10px" color="gray.500">{record.role}</Text>
    </Stack>,
    <Stack key={`${record.applicationCode}-contact`} gap={0.5} minW="160px">
      <Flex align="center" gap={1.5}>
        <Icon as={Mail} boxSize={3.5} color="gray.400" />
        <Text fontSize="xs" color="gray.700" truncate>{record.email}</Text>
      </Flex>
      <Flex align="center" gap={1.5}>
        <Icon as={Phone} boxSize={3.5} color="gray.400" />
        <Text fontSize="xs" color="gray.700">{record.phone}</Text>
      </Flex>
    </Stack>,
    <Box key={`${record.applicationCode}-status`} minW="160px" maxW="170px">
      {(() => {
        const selectedStatus = statusByCode[record.applicationCode] || record.currentStatus
        const statusPillStyles: Record<string, { bg: string; borderColor: string }> = {
          Pending: {
            bg: 'rgba(201, 152, 36, 0.15)',
            borderColor: 'rgba(201, 152, 36, 0.35)',
          },
          'Under Review': {
            bg: 'rgba(1, 74, 141, 0.12)',
            borderColor: 'rgba(1, 74, 141, 0.25)',
          },
        }
        const statusStyle = statusPillStyles[selectedStatus] || statusPillStyles.Pending

        return (
      <LymnconSelect
        options={statusOptions}
        value={selectedStatus}
        onChange={(event) =>
          setStatusByCode((prev) => ({
            ...prev,
            [record.applicationCode]: event.target.value,
          }))
        }
        placeholder="Select status"
        style={{
          height: '32px',
          fontSize: '12px',
          borderRadius: '999px',
          background: statusStyle.bg,
          borderColor: statusStyle.borderColor,
          color: '#1A202C',
          fontWeight: 600
        }}
      />
        )
      })()}
    </Box>,
    <Box key={`${record.applicationCode}-actions`} minW="64px">
      <LymnconActionMenu
        actions={actionOptions}
        onActionSelect={(actionValue) => {
          if (actionValue === 'upload-documents') {
            setActiveDocApplicant(record)
          }
        }}
      />
    </Box>
  ])

  return (
    <>
      <LymnconTable
        columns={columns}
        rows={rows}
      />

      {activeDocApplicant && (
        <Box
          position="fixed"
          inset={0}
          bg="rgba(1, 31, 62, 0.4)"
          backdropFilter="blur(6px)"
          zIndex={2000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Box
            w="100%"
            maxW="760px"
            maxH={{ base: '95vh', md: '90vh' }}
            bg="white"
            borderRadius={{ base: 'xl', md: '2xl' }}
            border="1px solid"
            borderColor={BRAND_COLORS.border}
            boxShadow="0 30px 100px rgba(1, 74, 141, 0.25)"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            animation="fadeIn 0.3s ease-out"
          >
            <Box bg={BRAND_COLORS.blue} color="white" p={{ base: 4, md: 6 }} position="relative" flexShrink={0}>
              <Box position="absolute" right={6} top="50%" transform="translateY(-50%)" opacity={0.2}>
                <Icon as={ShieldCheck} boxSize={{ base: 12, md: 20 }} />
              </Box>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="800" letterSpacing="tight">
                Compliance Review & Document Upload
              </Text>
              <Text fontSize="sm" opacity={0.9} mt={1}>
                Processing application for: <strong>{activeDocApplicant.fullName}</strong>
              </Text>
            </Box>

            <Stack gap={6} p={{ base: 4, md: 6 }} overflowY="auto" flex={1}>
              <Box bg="#F8FAFC" p={4} borderRadius="xl" border="1px dashed" borderColor="blue.100">
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                  <Stack gap={0}>
                    <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Applicant Code</Text>
                    <Text fontWeight="bold" color={BRAND_COLORS.blue}>{activeDocApplicant.applicationCode}</Text>
                  </Stack>
                  <Stack gap={0}>
                    <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Assigned Role</Text>
                    <Text fontWeight="bold" color={BRAND_COLORS.blue}>{activeDocApplicant.role}</Text>
                  </Stack>
                  <Stack gap={0}>
                    <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">Location Context</Text>
                    <Text fontWeight="bold" color={BRAND_COLORS.blue}>{activeDocApplicant.country}</Text>
                  </Stack>
                </SimpleGrid>
              </Box>

              <Box h="1px" bg="gray.100" w="100%" />

              <Grid templateColumns={{ base: '1fr', lg: '200px 1fr' }} gap={5}>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                    Document Classification
                  </Text>
                  <LymnconSelect options={documentTypeOptions} placeholder="Select document type" />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                    Verification Priority
                  </Text>
                  <LymnconSelect
                    options={[
                      { label: 'Normal Priority', value: 'normal' },
                      { label: 'High Priority', value: 'high' },
                      { label: 'Critical / Urgent', value: 'critical' },
                    ]}
                    placeholder="Select priority"
                  />
                </Box>
              </Grid>

              <Box>
                <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                  Upload Official Document
                </Text>
                <Box 
                  border="2px dashed" 
                  borderColor="gray.200" 
                  borderRadius="xl" 
                  p={{ base: 5, md: 8 }}
                  textAlign="center"
                  _hover={{ borderColor: BRAND_COLORS.blue, bg: 'blue.50' }}
                  transition="all 0.2s"
                  cursor="pointer"
                  position="relative"
                >
                  <Icon as={UploadCloud} boxSize={8} color={BRAND_COLORS.blue} mb={2} />
                  <Text fontWeight="bold">Click to upload or drag and drop</Text>
                  <Text fontSize="xs" color="gray.500">PDF, JPG, PNG (Max 10MB)</Text>
                  <LymnconInput type="file" opacity={0} position="absolute" cursor="pointer" inset={0} h="100%" />
                </Box>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                  Internal Compliance Notes
                </Text>
                <LymnconTextarea
                  minH="100px"
                  placeholder="Add legal/compliance notes specific to this applicant's verification process..."
                />
              </Box>

              <Flex justify="flex-end" gap={2} pt={2} wrap="wrap">
                <LymnconButton
                  label="Cancel"
                  variant="ghost"
                  onClick={() => setActiveDocApplicant(null)}
                />
                <LymnconButton label="Save Progress" variant="outline" />
                <LymnconButton label="Complete Verification" bg={BRAND_COLORS.blue} />
              </Flex>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  )
}
