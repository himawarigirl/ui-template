import React from "react";
import clsx from "clsx";

import styles from "./Notification.module.scss";
import {
  SuccessIcon,
  AlertIcon,
  WarningIcon,
  InfoIcon,
  CloseIcon,
} from "../../assets/icons";

export type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationProps {
  type?: NotificationType;
  title: string;
  description?: string;
  onClose?: () => void;
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  success: <SuccessIcon />,
  error: <AlertIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

export const Notification: React.FC<NotificationProps> = ({
  type = "info",
  title,
  description,
  onClose,
}) => {
  return (
    <div className={clsx(styles.notification, styles[type])}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.icon}>{iconMap[type]}</div>
          <h4 className={styles.title}>{title}</h4>
        </div>

        {onClose && (
          <button className={styles.close} onClick={onClose}>
            <CloseIcon />
          </button>
        )}
      </div>

      {description && (
        <div className={clsx(styles.description, "text-small-light")}>
          {description}
        </div>
      )}
    </div>
  );
};
