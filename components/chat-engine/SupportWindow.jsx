import styles from "../../styles/SupportWindow.module.css";
import ClientFeed from "./ClientFeed";
import Loading from "../Loading";

const SupportWindow = ({
  visible,
  setVisible,
  email,
  messages,
  setMessages,
  conversation,
  loading,
  setLoading,
}) => {
  return (
    <div
      style={{ display: visible ? "block" : "none" }}
      className={styles.support__window}
    >
      {loading && <Loading />}
      <svg onClick={() => setVisible(false)} className={styles.support__icon}>
        <use xlinkHref="/svg/close-sharp.svg#close-sharp"></use>
      </svg>

      <ClientFeed
        email={email}
        messages={messages}
        setMessages={setMessages}
        conversation={conversation}
        setLoading={setLoading}
      />
    </div>
  );
};

export default SupportWindow;
