import { Button, Icon } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { BRAND_COLORS } from './brand'

type LymnconNavButtonProps = {
  to: string
  label: string
  icon: LucideIcon
  variant?: 'solid' | 'outline' | 'ghost'
}

export function LymnconNavButton({
  to,
  label,
  icon,
  variant = 'ghost',
}: LymnconNavButtonProps) {
  const common = {
    size: 'sm' as const,
    borderRadius: 'md',
    fontWeight: 'semibold',
  }

  const styleProps =
    variant === 'solid'
      ? {
          bg: BRAND_COLORS.blue,
          color: 'white',
          _hover: { bg: '#013a6f' },
        }
      : variant === 'outline'
        ? {
            border: '1px solid',
            borderColor: BRAND_COLORS.blue,
            bg: BRAND_COLORS.blue,
            color: 'white',
            _hover: { bg: '#013a6f' },
          }
        : {
            bg: BRAND_COLORS.red,
            color: 'white',
            _hover: { bg: '#7d181b' },
          }

  return (
    <RouterLink to={to}>
      <Button {...common} {...styleProps}>
        <Icon as={icon} mr={2} boxSize={4} />
        {label}
      </Button>
    </RouterLink>
  )
}
