import { useState } from "react";
import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.spinner__wrapper}>
      <div className={styles.spinner__container}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default Loading;
