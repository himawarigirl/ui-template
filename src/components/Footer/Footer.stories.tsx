import type { Meta, StoryObj } from "@storybook/react";
import { Footer, FooterLink } from "./Footer";

const links: FooterLink[] = [
  { id: "link1", label: "link1", href: "#" },
  { id: "link2", label: "link2", href: "#" },
  { id: "link3", label: "link3", href: "#" },
];

const meta = {
  title: "Components/Footer",
  component: Footer,
  args: {
    logo: "Логотип",
    links,
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomLogo: Story = {
  args: {
    logo: "https://i.pinimg.com/736x/c7/8f/46/c78f4627e5ee9ad0f268983da54b9fed.jpg",
  },
};

export const WithActions: Story = {
  args: {
    links: [
      {
        id: "button",
        label: "Button" // работает на он клике который можно прописать! но я проверила
      },
      {
        id: "link",
        label: "Link",
        href: "#",
      },
    ],
  },
};

export const Minimal: Story = {
  args: {
    links: [],
  },
};