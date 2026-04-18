import React from "react";
import styles from "./Header.module.scss";

import Button from "../Button/Button";
import Input from "../Input/Input";

import { BellIcon, LoginIcon } from "../../assets/icons";
import { Avatar } from "../Avatar/Avatar";

type HeaderProps = {
  isAuth: boolean;

  logo?: string | React.ReactNode;
  searchPlaceholder?: string;

  user?: {
    initials: string;
  };

  onLoginClick?: () => void;
  onNotificationClick?: () => void;
};

const isImageSrc = (value: string) => {
  return /\.(png|jpe?g|svg|webp|gif)$/i.test(value);
};

export const Header: React.FC<HeaderProps> = ({
  isAuth,
  logo = "Название",
  searchPlaceholder = "Найти",
  user,
  onLoginClick,
  onNotificationClick,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {typeof logo === "string" ? (
            isImageSrc(logo) ? (
              <img src={logo} alt="logo" />
            ) : (
              logo
            )
          ) : (
            logo
          )}
        </div>

        <Input
          className={styles.search}
          state="search"
          placeholder={searchPlaceholder}
        />

        <div className={styles.actions}>
          {!isAuth ? (
            <Button
              variant="primary"
              className={styles.login}
              onClick={onLoginClick}
            >
              <span>Войти</span>
              <LoginIcon />
            </Button>
          ) : (
            <>
              <button
                type="button"
                className={styles.notifications}
                onClick={onNotificationClick}
                aria-label="Notifications"
              >
                <BellIcon />
              </button>
              <Avatar size="lg" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
