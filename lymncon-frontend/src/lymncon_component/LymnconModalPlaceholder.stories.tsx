import type { Meta, StoryObj } from '@storybook/react-vite'

import { LymnconModalPlaceholder } from './LymnconModalPlaceholder'

const meta = {
  title: 'Lymncon/Modal Placeholder',
  component: LymnconModalPlaceholder,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LymnconModalPlaceholder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Project Update',
    message: 'Modal interactions will be added in the next phase.',
  },
}
