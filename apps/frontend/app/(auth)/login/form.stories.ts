import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./form";

const meta = {
  component: LoginForm,
  title: "Form/Login",
  tags: ["autodocs"],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
