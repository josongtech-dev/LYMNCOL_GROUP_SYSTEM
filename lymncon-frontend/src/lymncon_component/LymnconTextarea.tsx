import { Textarea, type TextareaProps } from '@chakra-ui/react'
import { BRAND_COLORS } from './brand'

type LymnconTextareaProps = TextareaProps

export function LymnconTextarea(props: LymnconTextareaProps) {
  return (
    <Textarea
      bg="white"
      borderColor={BRAND_COLORS.border}
      borderRadius="md"
      _focusVisible={{ borderColor: BRAND_COLORS.blue, boxShadow: `0 0 0 1px ${BRAND_COLORS.blue}` }}
      {...props}
    />
  )
}
