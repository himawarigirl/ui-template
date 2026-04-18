import React from "react";
import clsx from "clsx";
import styles from "./Avatar.module.scss";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const getInitials = (name?: string) => {
  if (!name) return "??";
  const parts = name.trim().split(" ");
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = "md",
  className,
}) => {
  const initials = getInitials(name);

  return (
    <div className={clsx(styles.avatar, styles[size], className)}>
      {src ? (
        <img src={src} alt={alt || name || "avatar"} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
    </div>
  );
};
