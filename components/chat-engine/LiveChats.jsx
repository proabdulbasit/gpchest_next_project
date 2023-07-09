import styles from "../../styles/LiveChats.module.css";

const LiveChats = ({ onlineUser }) => {
  return (
    <div className={styles.live__chats}>
      <div className={styles.notify}></div>
      <span>{onlineUser.userEmail}</span>
    </div>
  );
};

export default LiveChats;
