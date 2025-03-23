import { InputText } from "@/components/inputs";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputText> = {
  component: InputText,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    startAdornment: { control: { disable: true } },
    endAdornment: { control: { disable: true } },
    wrapperProps: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => <InputText {...args} style={{ ...args.style, width: "16rem" }} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    status: "neutral",
    value: "Hello, world!",
  },
};

export const Placeholder: Story = {
  args: {
    status: "neutral",
    value: "",
    placeholder: "Your text here..."
  },
};
