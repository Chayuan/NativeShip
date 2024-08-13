import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './TextInput';

const meta = {
    title: 'TextInput',
    component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        title: 'Hello world',
    },
};
