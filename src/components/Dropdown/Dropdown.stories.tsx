import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownItem } from "./Dropdown";

import { LogoutIcon, SettingsIcon, InfoIcon } from "../../assets/icons";

import { Rating } from "../Rating/Rating";
import { Avatar } from "../Avatar/Avatar";

const items: DropdownItem[] = [
  {
    id: "edit",
    label: "Edit",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "delete",
    label: "Delete",
    onClick: () => console.log("Delete clicked"),
  },
  {
    id: "disabled",
    label: "Disabled item",
    disabled: true,
  },
];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    align: "right",
    width: 200,
    trigger: "Open",
    items,
  },
  argTypes: {
    align: {
      control: "select",
      options: ["left", "right"],
    },
    width: {
      control: "number",
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aligning: Story = {
  args: {
    align: "left",
  },
};

export const ProfileMenu: Story = {
  args: {
    width: 220,
    align: "left",
    items: [
      {
        id: "profile-preview",
        content: (
          <div style={{ display: "flex", gap: 8}}>
            <Avatar />
            <div>
              <div style={{ fontWeight: 600 }}>Name</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>mail@mail.mail</div>
            </div> 
          </div>
        ),
      }, // это костыля и я сделаю лучше! смотрела иконки тд тп
      {
        id: "rating",
        label: "Rating",
        content: (
          <div style={{ padding: 8 }}>
            <Rating value={4} readonly />
          </div>
        ),
        interactive: false,
      },
      {
        id: "profile",
        label: "Profile",
        icon: <InfoIcon />,
      },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon />,
      },
      {
        id: "logout",
        label: "Logout",
        icon: <LogoutIcon />,
      },
    ],
  },
};
