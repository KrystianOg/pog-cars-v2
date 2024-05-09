import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  component: Input,
  title: "UI/Input",
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailInput: Story = {
  args: {
    placeholder: "Email",
    type: "email",
  },
};

export const EmailInputDisabled: Story = {
  args: {
    placeholder: "Email",
    type: "email",
    disabled: true,
  },
};

export const Checkbox: Story = {
  args: {
    type: "checkbox",
  },
};
