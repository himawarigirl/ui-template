import React from "react";
import styles from "./Footer.module.scss";

interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface FooterProps {
  logo?: React.ReactNode;
  links?: FooterLink[];
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logo = "Название",
  links = [],
  copyright = "© Права защищены",
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.logo}>{logo}</div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span>{copyright}</span>

          <div className={styles.links}>
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={link.onClick}
                className={styles.link}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
