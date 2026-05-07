import { Box, type BoxProps } from '@chakra-ui/react'
import { BRAND_COLORS, SPACING } from './brand'

interface LymnconCardProps extends BoxProps {
  variant?: 'premium' | 'simple' | 'glass'
}

export function LymnconCard({ variant = 'premium', ...props }: LymnconCardProps) {
  const styles = {
    premium: {
      bg: 'white/70',
      backdropFilter: 'blur(16px)',
      border: '1px solid',
      borderColor: 'white/20',
      boxShadow: '0 25px 50px -12px rgba(1, 74, 141, 0.15)',
      borderTop: '4px solid',
      borderTopColor: BRAND_COLORS.gold,
    },
    simple: {
      bg: 'white',
      border: '1px solid',
      borderColor: BRAND_COLORS.border,
      boxShadow: 'sm',
    },
    glass: {
      bg: 'white/40',
      backdropFilter: 'blur(8px)',
      border: '1px solid',
      borderColor: 'white/10',
      boxShadow: 'lg',
    },
  }

  return (
    <Box
      borderRadius="2xl"
      p={{ base: 4, md: 6 }}
      transition="all 0.2s"
      w="100%"
      minW={0}
      {...(styles[variant] || styles.premium)}
      {...props}
    />
  )
}
