import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";

const meta = {
  component: Avatar,
  title: "UI/Avatar",
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithImg: Story = {
  args: {
    id: 1,
    img: "https://cache.getarchive.net/Prod/thumb/cdn12/L3Bob3RvLzIwMTYvMTIvMzEvY2F0LWFuaW1hbC10b21jYXQtYW5pbWFscy1hMGNkYjctMTAyNC5qcGc%3D/320/212/jpg",
    firstName: "John",
    lastName: "Doe",
  },
};

export const WithoutImg: Story = {
  args: {
    id: 2,
    firstName: "Emilia",
    lastName: "Doe",
  },
};
