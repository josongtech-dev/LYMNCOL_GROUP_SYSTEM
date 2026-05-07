import { Box, Table } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { BRAND_COLORS } from './brand'

type ResponsiveDisplay = string | Record<string, string | undefined>
type Column = string | { label: string; display?: ResponsiveDisplay }

type LymnconTableProps = {
  columns: Column[]
  rows: ReactNode[][]
}

export function LymnconTable({ columns, rows }: LymnconTableProps) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor={BRAND_COLORS.border}
      borderRadius="lg"
      boxShadow="0 4px 14px rgba(1, 74, 141, 0.08)"
      overflowX="auto"
      w="100%"
      css={{
        '&::-webkit-scrollbar': { height: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: `${BRAND_COLORS.blue}30`, borderRadius: '10px' },
        '&::-webkit-scrollbar-thumb:hover': { background: BRAND_COLORS.blue },
      }}
    >
      <Table.Root size="sm" minW={{ base: '100%', md: '700px' }}>
        <Table.Header bg="#F4F8FC">
          <Table.Row>
            {columns.map((column, index) => {
              const label = typeof column === 'string' ? column : column.label
              const display = typeof column === 'string' ? undefined : column.display
              
              return (
                <Table.ColumnHeader 
                  key={`col-${index}`} 
                  color={BRAND_COLORS.blue} 
                  fontWeight="bold"
                  fontSize="xs"
                  py={3}
                  px={3}
                  whiteSpace="nowrap"
                  display={display}
                >
                  {label}
                </Table.ColumnHeader>
              )
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, rowIndex) => (
            <Table.Row 
              key={`row-${rowIndex}`}
              _hover={{ bg: 'blue.50/30' }}
              transition="background 0.2s"
            >
              {row.map((cell, cellIndex) => {
                const column = columns[cellIndex]
                const display = typeof column === 'string' ? undefined : column?.display
                
                return (
                  <Table.Cell 
                    key={`cell-${rowIndex}-${cellIndex}`}
                    py={3}
                    px={3}
                    fontSize="xs"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                    display={display}
                  >
                    {cell}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
