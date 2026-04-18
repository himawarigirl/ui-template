import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./Dropdown.module.scss";
import Button from "../Button/Button";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  interactive?: boolean;
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
      <Button
        variant="primary"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {trigger}
      </Button>

      {open && (
        <div
          className={clsx(
            styles.menu,
            align === "left" && styles.left,
            align === "right" && styles.right
          )}
          style={{ width }}
          role="menu"
        >
          {items.map((item) => (
            <div
              key={item.id}
              role="menuitem"
              className={clsx(
                styles.item,
                item.disabled && styles.disabled,
                item.interactive === false && styles.static
              )}
              onClick={() => {
                if (item.disabled || item.interactive === false) return;
                item.onClick?.();
                setOpen(false);
              }}
            >
              <>
                {(item.icon || item.label) && (
                  <div className={styles.main}>
                    {item.icon && (
                      <span className={styles.icon}>{item.icon}</span>
                    )}
                    {item.label && <span>{item.label}</span>}
                  </div>
                )}

                {item.content && (
                  <div className={styles.content}>{item.content}</div>
                )}
              </>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
