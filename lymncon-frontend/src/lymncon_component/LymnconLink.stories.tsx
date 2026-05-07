import type { Meta, StoryObj } from '@storybook/react-vite'

import { LymnconLink } from './LymnconLink'

const meta = {
  title: 'Lymncon/Link',
  component: LymnconLink,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LymnconLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Open Vite Docs',
    href: 'https://vite.dev/guide/',
  },
}
