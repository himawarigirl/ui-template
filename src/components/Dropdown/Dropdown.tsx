import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./Dropdown.module.scss";

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  width?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = "right",
  width = 200,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={styles.dropdown} ref={ref}>
      <div
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        {trigger}
      </div>

      {open && (
        <div
          className={clsx(
            styles.menu,
            align === "left" && styles.left,
            align === "right" && styles.right
          )}
          style={{ width }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={clsx(
                styles.item,
                item.disabled && styles.disabled
              )}
              onClick={() => {
                if (item.disabled) return;
                item.onClick?.();
                setOpen(false);
              }}
            >
              {item.icon && (
                <span className={styles.icon}>{item.icon}</span>
              )}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};