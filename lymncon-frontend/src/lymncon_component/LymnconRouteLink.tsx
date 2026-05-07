import { Link as RouterLink } from 'react-router-dom'
import { BRAND_COLORS, TYPOGRAPHY } from './brand'

type LymnconRouteLinkProps = {
  to: string
  label: string
}

export function LymnconRouteLink({ to, label }: LymnconRouteLinkProps) {
  return (
    <RouterLink
      to={to}
      style={{
        color: BRAND_COLORS.blue,
        fontWeight: TYPOGRAPHY.bodyBold.weight,
        fontSize: 'inherit',
        textDecoration: 'none',
        transition: 'all 0.2s',
      }}
    >
      {label}
    </RouterLink>
  )
}
