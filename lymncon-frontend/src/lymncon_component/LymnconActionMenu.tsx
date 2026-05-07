import { Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { MoreHorizontal } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { BRAND_COLORS } from './brand'

export type LymnconActionItem = {
  label: string
  value: string
  icon?: ReactNode
}

type LymnconActionMenuProps = {
  actions: LymnconActionItem[]
  onActionSelect?: (value: string) => void
}

const DROPDOWN_HEIGHT_ESTIMATE = 44 * 7 // ~7 items × row height
const SPACING = 8

export function LymnconActionMenu({ actions, onActionSelect }: LymnconActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [opensUpward, setOpensUpward] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const handleToggle = () => {
    if (!isOpen && rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      setOpensUpward(spaceBelow < DROPDOWN_HEIGHT_ESTIMATE + SPACING)
    }
    setIsOpen((prev) => !prev)
  }

  const dropdownPosition = opensUpward
    ? { bottom: `calc(100% + ${SPACING}px)`, top: 'auto' }
    : { top: `calc(100% + ${SPACING}px)`, bottom: 'auto' }

  const transformOrigin = opensUpward ? 'bottom right' : 'top right'
  const hiddenTransform = opensUpward
    ? 'translateY(6px) scale(0.97)'
    : 'translateY(-6px) scale(0.97)'

  return (
    <Box ref={rootRef} position="relative" display="inline-flex">
      <IconButton
        aria-label="Open actions menu"
        variant="ghost"
        size="xs"
        borderRadius="full"
        color={BRAND_COLORS.blue}
        _hover={{ bg: 'blue.50' }}
        onClick={handleToggle}
      >
        <Icon as={MoreHorizontal} boxSize={4} />
      </IconButton>

      <Box
        position="absolute"
        {...dropdownPosition}
        right={0}
        minW="190px"
        zIndex={9999}
        bg="linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)"
        border="1px solid"
        borderColor={BRAND_COLORS.border}
        borderRadius="md"
        boxShadow="0 16px 35px rgba(1, 74, 141, 0.18)"
        opacity={isOpen ? 1 : 0}
        transform={isOpen ? 'translateY(0) scale(1)' : hiddenTransform}
        transformOrigin={transformOrigin}
        transition="opacity 0.18s ease, transform 0.18s ease"
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        {actions.map((action, index) => {
          const isDelete = action.value === 'delete'
          const isPrimary = action.value === 'upload-documents'

          return (
            <Box
              key={action.value}
              px={3}
              py={2.5}
              cursor="pointer"
              bg={isPrimary ? 'blue.50/70' : 'transparent'}
              _hover={{ bg: isDelete ? 'red.50' : 'blue.50' }}
              borderBottom="1px solid"
              borderColor={index === actions.length - 1 ? 'transparent' : 'gray.100'}
              onClick={() => {
                onActionSelect?.(action.value)
                setIsOpen(false)
              }}
            >
              <Box fontSize="sm" color={isDelete ? 'red.600' : 'gray.700'} fontWeight={isPrimary ? '600' : '500'}>
                <Flex align="center" gap={2}>
                  {action.icon && <Box display="inline-flex">{action.icon}</Box>}
                  <span>{action.label}</span>
                </Flex>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
