import { ElementType } from "react";
import styles from "./styles.module.scss";

export default function FormWithImg({ imgSrc, bgColor, Form, title }: Props) {
  return (
    <div
      className={styles["form-with-img"]}
      style={{ backgroundColor: bgColor }}
    >
      <div className={styles["form-wrapper"]}>
        <div className={styles["img-container"]}>
          <img src={imgSrc} alt="" />
        </div>
        <div className={styles["form-container"]}>
          <h1 className={styles.title}>{title}</h1>
          <Form />
        </div>
      </div>
    </div>
  );
}

type Props = {
  imgSrc: string;
  bgColor?: string;
  Form: ElementType;
  title?: string;
};
