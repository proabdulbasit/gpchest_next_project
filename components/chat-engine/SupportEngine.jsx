import Avatar from "./Avatar";
import SupportWindow from "./SupportWindow";
import styles from "../../styles/SupportEngine.module.css";
import { useState, useRef, useEffect, useContext } from "react";
import { AdEmailContext } from "../../store/store";
import axios from "axios";

const SupportEngine = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [messages, setMessages] = useState(null);
  const [conversation, setConversation] = useState(null);
  const { adEmail } = useContext(AdEmailContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    // This is how you write code when component Unmounts...like exiting the website, this following return block runs.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  // generating a random email
  useEffect(() => {
    const result = `user${Math.random().toString(36).substring(2)}`;
    setEmail(result);
  }, []);

  async function createConversation(senderEmail) {
    try {
      const res = await axios.post("/api/conversations/", {
        senderEmail,
        receiverEmail: adEmail,
      });
      setConversation(res.data);
    } catch (err) {
      return;
    }
  }

  const handleClick = async () => {
    if (conversation === null) {
      setVisible(true);
      setLoading(true);

      await createConversation(email);
    } else {
      setVisible(true);
    }
  };

  return (
    <div
      ref={ref}
      className={styles.avatar}
      style={{ position: "fixed", bottom: "24px", right: "24px" }}
    >
      <SupportWindow
        email={email}
        messages={messages}
        setMessages={setMessages}
        conversation={conversation}
        visible={visible}
        setVisible={setVisible}
        loading={loading}
        setLoading={setLoading}
      />
      <Avatar onClick={handleClick} />
    </div>
  );
};

export default SupportEngine;
