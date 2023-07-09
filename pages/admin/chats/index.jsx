import styles from "../../../styles/Chats.module.css";
import NavbarAd from "../../../components/NavbarAd";
import Navbar from "../../../components/Navbar";
import Feed from "../../../components/chat-engine/Feed";
import LiveChats from "../../../components/chat-engine/LiveChats";
import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { PlayContext } from "../../../store/store";

export default function Chats() {
  const { status, data } = useSession();
  const { setPlay } = useContext(PlayContext);

  const menuRef = useRef();
  const navbarRef = useRef();
  const liveChatRef = useRef();
  const [conversationId, setConversationId] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [user, setUser] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/admin");
  }, [status]);

  useEffect(() => {
    socketInitializer();
  }, []);

  socket?.on("getMessage", (data) => {
    setArrivalMessage({
      sender: data.senderId,
      receiver: data.receiverId,
      text: data.text,
      createdAt: Date.now(),
    });
  });

  useEffect(() => {
    if (currentChat === arrivalMessage?.sender) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    setSocket(io());
  };

  useEffect(() => {
    setUser(data);
  }, [data]);

  useEffect(() => {
    socket?.emit("addUser", user?.user.email);
    socket?.on("getUsers", (users) => {
      setOnlineUsers(
        users?.filter((onlineUser) => onlineUser.userEmail !== user?.user.email)
      );
    });
  }, [socket, user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        menuRef.current.style.visibility = "visible";
        navbarRef.current.style.display = "none";
      }
    }

    if (window.innerWidth < 871) {
      document.addEventListener("mousedown", handleClickOutside);

      // This is how you write code when component Unmounts...like exiting the website, this following return block runs.
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [navbarRef]);

  useEffect(() => {
    function handleClickOutsideLiveChat(event) {
      if (liveChatRef.current && !liveChatRef.current.contains(event.target)) {
        liveChatRef.current.style.display = "none";
      }
    }

    if (window.innerWidth < 1075) {
      document.addEventListener("mousedown", handleClickOutsideLiveChat);

      //   // This is how you write code when component Unmounts...like exiting the website, this following return block runs.
      return () => {
        document.removeEventListener("mousedown", handleClickOutsideLiveChat);
      };
    }
  }, [liveChatRef]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`/api/conversations/${currentChat}`);
        setConversation(res.data);
        setConversationId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };

    getConversation();
  }, [currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${conversationId}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [conversationId]);

  // this shows the notification sign
  useEffect(() => {
    if (currentChat !== arrivalMessage?.sender) {
      const liveUsersColl = liveChatRef.current?.children;

      const liveUsers = [...liveUsersColl];

      liveUsers.map((liveUser) => {
        if (liveUser.innerText === arrivalMessage?.sender) {
          liveUser.children[0].children[0].style.display = "block";

          setPlay(true);
        }
      });
    }
  }, [arrivalMessage, currentChat]);

  const handleClickChat = (onlineUser) => {
    setCurrentChat(onlineUser.userEmail);
    const liveUsersColl = liveChatRef.current?.children;
    const liveUsers = [...liveUsersColl];
    liveUsers.map((liveUser) => {
      if (liveUser.innerText === onlineUser?.userEmail) {
        liveUser.children[0].children[0].style.display = "none";
      }
    });
  };

  const adminNavToggle = () => {
    menuRef.current.style.visibility = "hidden";
    navbarRef.current.style.display = "block";
  };

  const liveChatToggle = () => {
    liveChatRef.current.style.display = "block";
  };

  // Creating a new message and saving to DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?.user.email,
      text: newMessage,
      conversationId: conversationId,
    };

    const receiverId = conversation?.members.find(
      (member) => member !== user?.user.email
    );

    socket?.emit("sendMessage", {
      senderId: user?.user.email,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`/api/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.chats}>
      <Navbar />
      <div className="global__container">
        <div className="admin__wrapper">
          <svg
            onClick={adminNavToggle}
            ref={menuRef}
            className="admin__menu__icon"
          >
            <use xlinkHref="/svg/menu.svg#menu"></use>
          </svg>

          <div ref={navbarRef} className="admin__navbar">
            <NavbarAd />
          </div>
          <div className="component__wrapper">
            <div className={styles.chats__wrapper}>
              <div className={styles.chats__feed__wrapper}>
                {currentChat ? (
                  <Feed
                    handleSubmit={handleSubmit}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    messages={messages}
                    currentUser={user}
                  />
                ) : (
                  <p className={styles.chats__no__chat}>
                    Open a conversation to start a chat.
                  </p>
                )}
              </div>
              <div onClick={liveChatToggle} className={styles.chats__toggle}>
                <span>Live Chats</span>
                <svg className={styles.chats__icon}>
                  <use xlinkHref="/svg/arrow-down.svg#arrow-down"></use>
                </svg>
              </div>
              {onlineUsers && (
                <div ref={liveChatRef} className={styles.chats__live__wrapper}>
                  {onlineUsers?.map((onlineUser, idx) => (
                    <div onClick={() => handleClickChat(onlineUser)} key={idx}>
                      <LiveChats onlineUser={onlineUser} user={user} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
