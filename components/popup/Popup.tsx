import styles from "./Popup.module.scss";
import Image from "next/image";

export function Popup({
  title = "",
  subtitle = "",
  children,
  visible = false,
  icon,
  onClose,
}: {
  title?: string;
  subtitle?: string;
  children?: any;
  visible?: boolean;
  icon?: any;
  onClose: () => void;
}) {
  return (
    <>
      {visible && (
        <div onClick={onClose} className={styles.container}>
          <div onClick={(e) => e.stopPropagation()} className={styles.popup}>
            {icon && (
              <div className={styles.icon__container}>
                <Image
                  layout="fill"
                  objectFit="contain"
                  className={styles.icon}
                  src={icon}
                  alt=""
                />
              </div>
            )}
            {title && <p className={styles.title}>{title}</p>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}