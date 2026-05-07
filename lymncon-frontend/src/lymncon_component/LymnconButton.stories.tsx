import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'
import { LymnconButton } from './LymnconButton'

const meta = {
  title: 'Lymncon/Button',
  component: LymnconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof LymnconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: { label: 'Small Button', size: 'sm' },
}

export const Medium: Story = {
  args: { label: 'Medium Button', size: 'md' },
}

export const LargeOutline: Story = {
  args: { label: 'Large Outline Button', size: 'lg', variant: 'outline' },
}
