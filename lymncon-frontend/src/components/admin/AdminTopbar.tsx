import { Box, Flex, Heading, Stack, Text, Icon, Input, IconButton, Collapsible } from '@chakra-ui/react'
import { Search, Bell, UserCircle, LogOut, Moon, Sun, ChevronDown, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BRAND_COLORS, LymnconButton } from '../../lymncon_component'
import { useThemeMode } from '../../context/useThemeMode'

interface AdminTopbarProps {
  isExpanded?: boolean
}

export function AdminTopbar({ isExpanded = false }: AdminTopbarProps) {
  const navigate = useNavigate()
  const { themeMode, toggleTheme } = useThemeMode()
  const isDark = themeMode === 'dark'

  return (
    <Box w="100%">
      <Flex justify="space-between" align="center" gap={{ base: 2, md: 3 }}>
        <Stack gap={0} minW={0} flex={1}>
          <Heading
            fontSize={{ base: 'sm', sm: 'md', lg: 'lg' }}
            color={isDark ? 'white' : BRAND_COLORS.blue}
            fontWeight="800"
            letterSpacing="-0.02em"
            lineClamp={1}
          >
            System Overview
          </Heading>
          <Text
            color={isDark ? 'gray.300' : 'gray.400'}
            fontSize="10px"
            fontWeight="bold"
            display={{ base: 'none', md: 'block' }}
          >
            WELCOME BACK, ADMIN
          </Text>
        </Stack>

        {/* Desktop Search */}
        <Flex flex={1} maxW="300px" display={{ base: 'none', xl: 'flex' }} position="relative">
          <Icon
            as={Search}
            color="gray.400"
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}
          />
          <Input
            placeholder="Search..."
            bg={isDark ? 'whiteAlpha.100' : 'white'}
            border="1px solid"
            borderColor={isDark ? 'whiteAlpha.300' : BRAND_COLORS.border}
            color={isDark ? 'gray.100' : 'gray.800'}
            _placeholder={{ color: isDark ? 'gray.300' : 'gray.400' }}
            _focusVisible={{ borderColor: BRAND_COLORS.blue, boxShadow: 'sm' }}
            borderRadius="xl"
            fontSize="sm"
            pl={10}
            h="36px"
          />
        </Flex>

        {/* Desktop Icons */}
        <Flex gap={{ base: 1.5, md: 4 }} align="center" flexShrink={0} display={{ base: 'none', md: 'flex' }}>
          <Flex
            align="center"
            gap={{ base: 1.5, md: 3 }}
            px={{ base: 1, md: 3 }}
            borderRight="1px solid"
            borderColor={isDark ? 'whiteAlpha.300' : 'gray.100'}
            mr={{ base: 0, md: 2 }}
          >
            <IconButton
              aria-label="Toggle Theme"
              size="sm"
              variant="ghost"
              borderRadius="full"
              onClick={toggleTheme}
              minW="32px"
              h="32px"
            >
              <Icon as={isDark ? Sun : Moon} boxSize={4} color={isDark ? BRAND_COLORS.gold : 'gray.500'} />
            </IconButton>

            <Box position="relative">
              <Icon
                as={Bell}
                color={isDark ? 'gray.200' : 'gray.500'}
                boxSize={4.5}
                cursor="pointer"
                _hover={{ color: BRAND_COLORS.blue }}
                onClick={() => navigate('/admin/notifications')}
              />
              <Box
                position="absolute"
                top="-2px"
                right="-2px"
                bg="red.500"
                w="6px"
                h="6px"
                borderRadius="full"
                border={isDark ? '2px solid #0F172A' : '2px solid white'}
              />
            </Box>

            <Icon
              as={UserCircle}
              color={isDark ? 'gray.200' : 'gray.500'}
              boxSize={5.5}
              cursor="pointer"
              _hover={{ color: BRAND_COLORS.blue }}
              onClick={() => navigate('/admin/profile')}
            />
          </Flex>

          <LymnconButton
            label="Log Out"
            size="sm"
            variant="ghost"
            leftIcon={<Icon as={LogOut} boxSize={3.5} />}
            onClick={() => navigate('/')}
            h="32px"
            fontSize="xs"
          />
        </Flex>
      </Flex>

      {/* Mobile Collapsible Actions */}
      <Collapsible.Root open={isExpanded}>
        <Collapsible.Content>
          <Stack gap={4} py={4} display={{ base: 'flex', md: 'none' }}>
            <Box position="relative">
              <Icon
                as={Search}
                color="gray.400"
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                zIndex={1}
              />
              <Input
                placeholder="Search everything..."
                bg={isDark ? 'whiteAlpha.100' : 'white'}
                border="1px solid"
                borderColor={isDark ? 'whiteAlpha.300' : BRAND_COLORS.border}
                fontSize="sm"
                pl={10}
                h="40px"
                borderRadius="xl"
              />
            </Box>
            <Flex justify="space-between" align="center" bg={isDark ? 'whiteAlpha.50' : 'gray.50'} p={3} borderRadius="xl">
              <Flex gap={4}>
                <IconButton
                  aria-label="Toggle Theme"
                  size="sm"
                  variant="ghost"
                  onClick={toggleTheme}
                >
                  <Icon as={isDark ? Sun : Moon} boxSize={5} color={isDark ? BRAND_COLORS.gold : 'gray.500'} />
                </IconButton>
                <IconButton
                  aria-label="Notifications"
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate('/admin/notifications')}
                >
                  <Icon as={Bell} boxSize={5} color={isDark ? 'gray.200' : 'gray.500'} />
                </IconButton>
                <IconButton
                  aria-label="Profile"
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate('/admin/profile')}
                >
                  <Icon as={UserCircle} boxSize={6} color={isDark ? 'gray.200' : 'gray.500'} />
                </IconButton>
              </Flex>
              <LymnconButton
                label="Log Out"
                size="sm"
                variant="outline"
                borderColor="red.200"
                color="red.500"
                onClick={() => navigate('/')}
              />
            </Flex>
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  )
}
