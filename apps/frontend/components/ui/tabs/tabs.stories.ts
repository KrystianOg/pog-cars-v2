import type { Meta, StoryObj } from "@storybook/react";
import { Tabs} from "./tabs";

const meta = {
  component: Tabs,
  title: "UI/Tabs",
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: ["Text", "Preview", "Some other tab"]
  },
};

