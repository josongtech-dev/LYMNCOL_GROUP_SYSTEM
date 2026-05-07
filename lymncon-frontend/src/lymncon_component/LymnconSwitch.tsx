import { Flex, Text } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'

type LymnconSwitchProps = {
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function LymnconSwitch({
  label,
  checked = false,
  onCheckedChange,
}: LymnconSwitchProps) {
  return (
    <Flex align="center" gap={3} cursor="pointer" onClick={() => onCheckedChange?.(!checked)}>
      <Switch.Root
        checked={checked}
        onCheckedChange={(event) => onCheckedChange?.(!!event.checked)}
        colorPalette="blue"
        size="sm"
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
      <Text fontSize="xs" fontWeight="bold" color="gray.600" userSelect="none">
        {label}
      </Text>
    </Flex>
  )
}
