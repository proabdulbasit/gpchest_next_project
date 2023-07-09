import styles from "../styles/UsersComponent.module.css";
import { useState } from "react";
import { updateUser } from "../client/requests";

const UsersComponent = ({ user }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    const userId = user[0]?._id;
    let modUser = {
      userId,
    };
    if (password && confirm !== password) {
      setError(true);
    }

    if (email) {
      modUser["email"] = email;
    }

    if (password && confirm === password) {
      modUser["password"] = password;
    }

    if (Object.keys(modUser).length > 1) {
      const res = await updateUser(userId, modUser);
      if (res.status === 201) {
        setSuccess(true);
      }

      if (res.status === 500 || res.status === 401) {
        setError(true);
      }
    }
  };

  return (
    <div className={styles.users__component}>
      <div className="global__container">
        <div className={styles.users__component__messages}>
          {error && <span className="error">Make sure passwords match.</span>}
          {success && <span className="success">User Updated!.</span>}
        </div>
        <div className={styles.users__component__wrapper}>
          <form
            onSubmit={handleSubmit}
            className={styles.users__component__form}
          >
            <h4>Admin</h4>
            <input
              className={styles.users__component__input}
              type="email"
              placeholder={user[0]?.email}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              className={styles.users__component__input}
              type="password"
              placeholder={user[0]?.password}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <input
              className={styles.users__component__input}
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirm(e.target.value)}
              value={confirm}
            />

            <div className={styles.users__component__btn__wrapper}>
              <button className={styles.users__component__btn}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsersComponent;
