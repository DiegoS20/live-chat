import { Link, LinkProps } from "react-router-dom";

import styles from "./styles.module.scss";

export default function WhiteLink({
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <Link {...props} className={[className, styles["white-link"]].join("")}>
      {children}
    </Link>
  );
}
