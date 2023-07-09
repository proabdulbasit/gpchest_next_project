import { useState, useEffect, useContext, useRef } from "react";
import styles from "../../styles/Avatar.module.css";
import { GoldContext, setWelcomeNotify } from "../../store/store";

const Avatar = (props) => {
  const [hovered, setHovered] = useState(false);
  const { sellGold } = useContext(GoldContext);
  const { notify } = useContext(setWelcomeNotify);
  const avatarRef = useRef();

  useEffect(() => {
    if (sellGold.length > 0) {
      avatarRef.current.click();
    }
  }, [sellGold]);

  useEffect(() => {
    if (notify) {
      avatarRef.current.click();
    }
  }, [notify]);

  return (
    <div>
      <div
        style={{ display: hovered ? "block" : "none" }}
        className={styles.avatar__hello}
      >
        Hello <span className={styles.avatar__wave}>👋</span>{" "}
      </div>
      {notify && <div className={styles.avatar__notify}>1</div>}

      <div
        ref={avatarRef}
        onClick={() => props.onClick && props.onClick()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={styles.avatar__button}
        style={{
          backgroundColor: hovered ? "#ffb655" : "#ffa42d",
        }}
      >
        <svg className={styles.avatar__icon}>
          <use xlinkHref="/svg/chat.svg#chat"></use>
        </svg>
      </div>
    </div>
  );
};

export default Avatar;
