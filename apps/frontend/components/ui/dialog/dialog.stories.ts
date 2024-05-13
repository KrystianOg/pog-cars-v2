import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./dialog";

const meta = {
  component: Dialog,
  title: "UI/Dialog",
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BuildingOffice: Story = {
  args: {},
};

export const DialogSmall: Story = {
  args: {},
};

export const DialogLarge: Story = {
  args: {},
};

export const Language: Story = {
  args: {},
};
