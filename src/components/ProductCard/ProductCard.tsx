import React from "react";
import clsx from "clsx";
import styles from "./ProductCard.module.scss";

import Button from "../Button/Button";
import { HeartIcon } from "../../assets/icons";

type Variant = "full" | "compact";

interface ProductCardProps {
  variant?: Variant;

  image: string;
  source: string;

  description?: string;
  category?: string;

  user?: {
    name: string;
    initials: string;
  };

  onMessage?: () => void;
  onMore?: () => void;

  isFavorite?: boolean;
  onFavoriteToggle?: () => void;

  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  variant = "full",
  image,
  source,
  description,
  category,
  user,
  onMessage,
  onMore,
  onFavoriteToggle,
  className,
}) => {
  return (
    <div className={clsx(styles.card, styles[`card--${variant}`], className)}>
      
      <div className={styles.card__top}>
        
        <div className={styles.card__imageWrapper}>
          <img src={image} alt={source} className={styles.card__image} />

          {variant === "full" && (
            <button
              className={styles.card__favorite}
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle?.();
              }}
            >
              <HeartIcon />
            </button>
          )}
        </div>

        <div className={styles.card__content}>
          {variant === "full" ? (
            <>
              <div className={styles.card__meta}>
                <a className={styles.card__source}>{source}</a>

                {user && (
                  <div className={styles.card__user}>
                    <div className={styles.card__avatar}>
                      {user.initials}
                    </div>
                    <span>{user.name}</span>
                  </div>
                )}
              </div>

              {description && (
                <p className={styles.card__description}>{description}</p>
              )}
            </>
          ) : (
            <>
              {category && (
                <span className={styles.card__category}>{category}</span>
              )}
              <a className={styles.card__source}>{source}</a>
            </>
          )}
        </div>
      </div>

      {variant === "full" ? (
        <div className={styles.card__actions}>
          <Button variant="secondary" className={styles.card__action} onClick={onMessage}>
            Написать
          </Button>
          <Button className={styles.card__action} onClick={onMore}>
            Подробнее
          </Button>
        </div>
      ) : (
        <div className={styles.card__compactActions}>
          <button
            className={styles.card__favorite}
            onClick={onFavoriteToggle}
          >
            <HeartIcon />
          </button>

          <Button variant="secondary" className={styles.card__action} onClick={onMore}>
            Подробнее
          </Button>
        </div>
      )}
    </div>
  );
};