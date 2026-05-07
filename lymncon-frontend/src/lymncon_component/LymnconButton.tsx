import { Button as ChakraButton, type ButtonProps } from '@chakra-ui/react'
import { BRAND_COLORS, TYPOGRAPHY } from './brand'

interface LymnconButtonProps extends ButtonProps {
  label: string
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

export function LymnconButton({
  label,
  size = 'md',
  variant = 'solid',
  leftIcon,
  rightIcon,
  ...props
}: LymnconButtonProps) {
  const baseStyles = {
    borderRadius: 'lg',
    fontWeight: TYPOGRAPHY.bodyBold.weight,
    fontSize: TYPOGRAPHY.body.size,
    transition: 'all 0.2s',
    _focusVisible: {
      outline: 'none',
      boxShadow: `0 0 0 2px ${BRAND_COLORS.blue}, 0 0 0 4px rgba(1, 74, 141, 0.2)`,
    },
    _active: { transform: 'scale(0.98)' },
  }

  const variants = {
    solid: {
      bg: BRAND_COLORS.blue,
      color: 'white',
      _hover: { bg: '#013a6f', transform: 'translateY(-1px)' },
    },
    outline: {
      borderColor: BRAND_COLORS.blue,
      color: BRAND_COLORS.blue,
      bg: 'transparent',
      borderWidth: '1px',
      _hover: { bg: 'blue.50', transform: 'translateY(-1px)' },
    },
    ghost: {
      color: BRAND_COLORS.blue,
      bg: 'transparent',
      _hover: { bg: 'blue.50' },
    },
  }

  return (
    <ChakraButton
      size={size}
      variant={variant}
      {...baseStyles}
      {...(variants[variant as keyof typeof variants] || variants.solid)}
      {...props}
    >
      {leftIcon && <span style={{ marginRight: '8px', display: 'inline-flex' }}>{leftIcon}</span>}
      {label}
      {rightIcon && <span style={{ marginLeft: '8px', display: 'inline-flex' }}>{rightIcon}</span>}
    </ChakraButton>
  )
}
