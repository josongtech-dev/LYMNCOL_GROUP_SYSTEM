import { Box, Flex, Text } from '@chakra-ui/react'
import { LymnconSelect } from './LymnconSelect'

type LymnconRowsPerPageSelectProps = {
  value: number
  onChange: (value: number) => void
  options?: number[]
  label?: string
}

export function LymnconRowsPerPageSelect({
  value,
  onChange,
  options = [15, 25, 35, 50, 100],
  label = 'Rows per page',
}: LymnconRowsPerPageSelectProps) {
  return (
    <Flex justify="flex-start" align="center" gap={2} wrap="wrap">
      <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600" whiteSpace="nowrap">
        {label}
      </Text>
      <Box w="86px">
        <LymnconSelect
          options={options.map((size) => ({ label: `${size}`, value: `${size}` }))}
          value={`${value}`}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label={label}
          style={{ height: '32px', fontSize: '12px', borderRadius: '10px' }}
        />
      </Box>
    </Flex>
  )
}
