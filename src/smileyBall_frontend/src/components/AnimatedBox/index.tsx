import styles from "./animatedBox.module.css";

export default function AnimatedBox({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
