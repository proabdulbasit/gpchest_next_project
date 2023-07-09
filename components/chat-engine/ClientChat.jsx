import styles from "../../styles/Chat.module.css";
import { format } from "timeago.js";
import Image from "next/image";

const Chat = ({ own, message }) => {
  return (
    <div className={own ? `${styles["chat__own"]}` : `${styles["chat"]}`}>
      <div className={styles.chat__wrapper}>
        <div
          className={
            own
              ? `${styles["chat__image__wrapper__own"]}`
              : `${styles["chat__image__wrapper"]}`
          }
        >
          <Image
            className={styles.chat__image}
            layout="fill"
            src={own ? "/images/avatar.png" : "/images/gp_avatar.png"}
            alt=""
          />
        </div>
        <p className={styles.chat__text}>{message?.text}</p>
      </div>
      <span className={styles.chat__date}>{format(message?.createdAt)}</span>
    </div>
  );
};

export default Chat;
