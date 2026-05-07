import { Checkbox } from '@chakra-ui/react'
import { BRAND_COLORS } from './brand'

type LymnconCheckboxProps = {
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function LymnconCheckbox({
  label,
  checked = false,
  onCheckedChange,
}: LymnconCheckboxProps) {
  return (
    <Checkbox.Root
      checked={checked}
      onCheckedChange={(event) => onCheckedChange?.(!!event.checked)}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control borderColor={BRAND_COLORS.blue} />
      <Checkbox.Label color={BRAND_COLORS.text} fontWeight="medium">
        {label}
      </Checkbox.Label>
    </Checkbox.Root>
  )
}
