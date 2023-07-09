import styles from "../../styles/EmailForm.module.css";
import { useEffect, useState, useContext } from "react";
import Loading from "../Loading";
import axios from "axios";
import { AdEmailContext } from "../../store/store";

const EmailForm = ({
  email,
  setEmail,
  setMessages,
  visible,
  conversation,
  setConversation,
}) => {
  const [loading, setLoading] = useState(false);
  const { adEmail } = useContext(AdEmailContext);

  useEffect(() => {
    if (conversation) {
      const getMessages = async () => {
        try {
          const res = await axios.get(`/api/messages/${conversation?._id}`);
          setMessages(res.data);
        } catch (err) {
          throw new Error(err);
        }
      };
      getMessages();
    }
  }, [conversation]);

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
  async function getConversation(senderEmail) {
    try {
      const res = await axios.get(`/api/conversations/${senderEmail}`);
      setConversation(res.data);
      return res.data;
    } catch (err) {
      return;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const convRes = await getConversation(email);
    if (!convRes) createConversation(email);
  };

  return (
    <div
      style={{
        height: visible ? "100%" : "0%",
        display: visible ? "block" : "none",
      }}
      className={styles.email__form}
    >
      <div style={{ height: "0px" }}>
        <div className={styles.email__form__stripe} />
      </div>

      <div
        style={{
          zIndex: loading ? "10" : "-1",
          opacity: loading ? "0.33" : "0",
        }}
        className={styles.email__form__loading}
      />
      {loading && <Loading />}

      <div className={styles.email__form__wrapper}>
        <div className={styles.email__form__title}>
          <h3>GP</h3>
          <svg className={styles.email__icon__moon}>
            <use xlinkHref="/svg/half-moon.svg#half-moon"></use>
          </svg>
          <h3>HEST</h3>
        </div>

        <h3 className={styles.email__form__text}>Welcome to our Support 👋</h3>

        <form
          className={styles.email__form__container}
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className={styles.email__form__input}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            type="email"
          />
        </form>

        <div className={styles.emai__form__bottom__text}>
          Enter your email <br /> to get started.
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
