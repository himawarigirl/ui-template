import React from "react";
import styles from "./Header.module.scss";

import Button from "../Button/Button";
import Input from "../Input/Input";

import { BellIcon, LoginIcon } from "../../assets/icons";

type HeaderProps = {
  isAuth: boolean;

  logo?: React.ReactNode;
  searchPlaceholder?: string;

  user?: {
    initials: string;
  };

  onLoginClick?: () => void;
  onNotificationClick?: () => void;
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
        <div className={styles.logo}>{logo}</div>

        <Input state="search" placeholder={searchPlaceholder} />

        <div className={styles.actions}>
          {!isAuth ? (
            <Button
              variant="primary"
              className={styles.login}
              onClick={onLoginClick}
            >
              Войти
              <LoginIcon />
            </Button>
          ) : (
            <>
              <button className={styles.icon} onClick={onNotificationClick}>
                <BellIcon />
              </button>

              <div className={styles.avatar}>{user?.initials || "XX"}</div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
