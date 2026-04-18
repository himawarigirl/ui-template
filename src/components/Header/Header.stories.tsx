import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
  args: {
    isAuth: false,
    logo: "Логотип",
    searchPlaceholder: "Найти",
  },
  argTypes: {
    isAuth: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    isAuth: false,
  },
};

export const LoggedIn: Story = {
  args: {
    isAuth: true
  },
};

export const CustomLogo: Story = {
  args: {
    logo: "https://i.pinimg.com/736x/c7/8f/46/c78f4627e5ee9ad0f268983da54b9fed.jpg",
  },
};