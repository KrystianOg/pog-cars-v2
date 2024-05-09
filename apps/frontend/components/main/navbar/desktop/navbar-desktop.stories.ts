import type { Meta, StoryObj } from "@storybook/react";
import { NavbarDesktop } from "./navbar-desktop";

const meta = {
  component: NavbarDesktop,
  title: "Main/NavbarDesktop",
  tags: ["autodocs"],
} satisfies Meta<typeof NavbarDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ItemActive: Story = {
  args: {},
};
