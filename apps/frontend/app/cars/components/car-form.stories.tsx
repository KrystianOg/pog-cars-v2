import type { Meta, StoryObj } from "@storybook/react";
import { CarForm } from "./car-form";

const meta = {
  component: CarForm,
  title: "Form/Car",
  tags: ["autodocs"],
} satisfies Meta<typeof CarForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
