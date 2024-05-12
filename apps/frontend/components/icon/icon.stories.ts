import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./icon";

const meta = {
  component: Icon,
  title: "UI/Icon",
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BuildingOffice: Story = {
  args: {
    kind: "language",
  },
};

export const IconSmall: Story = {
  args: {
    kind: "language",
    size: "sm",
  },
};

export const IconLarge: Story = {
  args: {
    kind: "language",
    size: "lg",
  },
};

export const Language: Story = {
  args: {
    kind: "language",
  },
};
