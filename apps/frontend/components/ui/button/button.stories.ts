import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  component: Button,
  title: "UI/Button",
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    children: "Button",
    variant: "destructive",
  },
};
