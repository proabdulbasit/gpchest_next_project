import styles from "../../styles/Feed.module.css";
import Chat from "./Chat";
import { useRef, useEffect } from "react";

const Feed = ({
  handleSubmit,
  newMessage,
  setNewMessage,
  messages,
  currentUser,
}) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.feed}>
      <div className={styles.feed__chats__wrapper}>
        {messages?.map((message, idx) => (
          <div className={styles.test} ref={scrollRef} key={idx}>
            <Chat
              message={message}
              own={message.sender === currentUser?.user.email}
            />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.feed__form}>
        <div className={styles.feed__input__wrapper}>
          <input
            className={styles.feed__form__input}
            type="text"
            placeholder="Type message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button onClick={handleSubmit} className={styles.feed__form__btn}>
            <svg onClick={handleSubmit} className={styles.feed__form__icon}>
              <use xlinkHref="/svg/paper-airplane.svg#paper-airplane"></use>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feed;
