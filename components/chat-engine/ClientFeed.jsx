import styles from "../../styles/Feed.module.css";
import ClientChat from "./ClientChat";
import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { GoldContext } from "../../store/store";

const ClientFeed = ({ email, messages, conversation, setLoading }) => {
  const scrollRef = useRef();
  const feedFormRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const { sellGold, setSellGold } = useContext(GoldContext);
  const [auto, setAuto] = useState(false);
  const [allMessages, setAllMessages] = useState([]);

  //   Connecting to the socket server.
  useEffect(() => {
    if (conversation) {
      socketInitializer();
    }
  }, [conversation]);

  useEffect(() => {
    if (messages !== null) {
      setAllMessages(messages);
    }
  }, [messages]);

  // welcome message for new users
  useEffect(() => {
    if (conversation) {
      const welcomeMessage =
        "Hi 👋, welcome to GPChest, i'll really like to assist you, tell me how i can help you today.";

      const message = {
        sender: "gpchest@mail.com",
        text: welcomeMessage,
        conversationId: conversation._id,
      };

      setAllMessages([message]);
      setLoading(false);
    }
  }, [conversation]);

  useEffect(() => {
    if (conversation) {
      socket?.emit("addUser", email);
    }
  }, [conversation, socket]);

  //   socket Initialization function.
  const socketInitializer = async () => {
    await fetch("/api/socket");
    setSocket(io());
  };

  // auto generating  message
  useEffect(() => {
    if (conversation && sellGold.length > 0) {
      setNewMessage(
        `I would like to sell my ${sellGold[0]?.price} ${sellGold[0]?.title} Gold`
      );

      setAuto(true);
    }
  }, [conversation, sellGold]);

  // auto sending  message
  useEffect(() => {
    if (conversation && sellGold.length > 0 && auto) {
      setAuto(false);

      feedFormRef.current.requestSubmit();

      setSellGold([]);
    }
  }, [conversation, sellGold, auto]);

  socket?.on("getMessage", (data) => {
    setArrivalMessage({
      sender: data.senderId,
      receiver: data.receiverId,
      text: data.text,
      createdAt: Date.now(),
    });
  });

  useEffect(() => {
    socket?.on("getAutoMessage", (data) => {
      setArrivalMessage({
        sender: data.receiverId,
        receiver: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage?.receiver === email) {
      setAllMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const reply = (email, receiverId, newMessage) => {
    socket?.emit("sendAutoMessage", {
      senderId: email,
      receiverId,
      text: newMessage,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: email,
      text: newMessage,
      conversationId: conversation._id,
    };

    const receiverId = conversation?.members.find((member) => member !== email);

    if (!auto) {
      socket?.emit("sendMessage", {
        senderId: email,
        receiverId,
        text: newMessage,
      });
    }

    try {
      const res = await axios.post("/api/messages", message);
      setAllMessages([...allMessages, res.data]);
      setNewMessage("");

      if (auto) {
        setTimeout(reply, 4000, email, receiverId, newMessage);
      }
    } catch (err) {
      return;
    }
  };

  return (
    <div className={styles.feed}>
      <div className={styles.feed__title__block}>
        <h4 className={styles.feed__title__block__head}>
          GPChest Customer Support
        </h4>
        <p className={styles.feed__title__block__more}>24/7 Live Chat</p>
      </div>
      <div className={styles.feed__chats__wrapper}>
        {allMessages?.map((message, idx) => (
          <div className={styles.test} ref={scrollRef} key={idx}>
            <ClientChat message={message} own={message?.sender === email} />
          </div>
        ))}
      </div>
      <form
        ref={feedFormRef}
        onSubmit={handleSubmit}
        className={styles.feed__form}
      >
        <div className={styles.feed__input__wrapper}>
          <input
            className={styles.feed__form__input}
            type="text"
            placeholder="Type message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button className={styles.feed__form__btn}>
            <svg onClick={handleSubmit} className={styles.feed__form__icon}>
              <use xlinkHref="/svg/paper-airplane.svg#paper-airplane"></use>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientFeed;
