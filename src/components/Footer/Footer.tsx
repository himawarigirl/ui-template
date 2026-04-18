import React from "react";
import styles from "./Footer.module.scss";
import Button from "../Button/Button";

export interface FooterLink {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface FooterProps {
  logo?: React.ReactNode;
  links?: FooterLink[];
  copyright?: string;
}

const currentYear = new Date().getFullYear();

const isImageSrc = (value: string) => {
  return /\.(png|jpe?g|svg|webp|gif)$/i.test(value);
};

export const Footer: React.FC<FooterProps> = ({
  logo = "Логотип",
  links = [],
  copyright = "Все права защищены.",
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
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
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span>© {currentYear} {copyright}</span>

          <div className={styles.links}>
            {links.map((link) => {
              const content = link.href ? (
                <a
                  href={link.href}
                  className={styles.link}
                  onClick={link.onClick}
                >
                  {link.label}
                </a>
              ) : (
                <Button
                  variant="tertiary"
                  className={styles.link}
                  onClick={link.onClick}
                >
                  {link.label}
                </Button>
              );

              return <React.Fragment key={link.id}>{content}</React.Fragment>;
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
