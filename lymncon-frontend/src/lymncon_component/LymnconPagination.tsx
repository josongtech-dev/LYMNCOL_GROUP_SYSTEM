import { Box, Flex, Text } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LymnconButton } from './LymnconButton'
import { LymnconSelect } from './LymnconSelect'

type LymnconPaginationProps = {
  totalItems: number
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
  pageSizeOptions?: number[]
  showPageSizeSelector?: boolean
}

export function LymnconPagination({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [15, 25, 50, 100],
  showPageSizeSelector = true,
}: LymnconPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const start = totalItems === 0 ? 0 : (safePage - 1) * itemsPerPage + 1
  const end = Math.min(safePage * itemsPerPage, totalItems)

  return (
    <Flex
      align={{ base: 'stretch', md: 'center' }}
      justify="space-between"
      gap={3}
      wrap="wrap"
      borderTop="1px solid"
      borderColor="gray.100"
      pt={3}
    >
      {showPageSizeSelector ? (
        <Flex align="center" gap={2}>
          <Text fontSize="sm" color="gray.600">
            Rows per page
          </Text>
          <Box minW="86px">
            <LymnconSelect
              options={pageSizeOptions.map((size) => ({ label: `${size}`, value: `${size}` }))}
              value={`${itemsPerPage}`}
              onChange={(event) => onItemsPerPageChange(Number(event.target.value))}
              aria-label="Rows per page"
              style={{ height: '32px', fontSize: '12px', borderRadius: '10px' }}
            />
          </Box>
        </Flex>
      ) : (
        <Box />
      )}

      <Flex align="center" gap={2} wrap="wrap" justify={{ base: 'space-between', md: 'flex-end' }} flex={1}>
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
          Showing {start}-{end} of {totalItems}
        </Text>

        <Flex align="center" gap={2}>
          <LymnconButton
            label="Previous"
            size="xs"
            variant="outline"
            leftIcon={<ChevronLeft size={14} />}
            onClick={() => onPageChange(Math.max(1, safePage - 1))}
            disabled={safePage === 1}
          />
          <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.700" minW={{ base: '56px', md: '72px' }} textAlign="center">
            {safePage} / {totalPages}
          </Text>
          <LymnconButton
            label="Next"
            size="xs"
            variant="outline"
            rightIcon={<ChevronRight size={14} />}
            onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
            disabled={safePage === totalPages}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
