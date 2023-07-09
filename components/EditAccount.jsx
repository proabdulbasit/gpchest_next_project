import styles from "../styles/EditAccount.module.css";
import { useState } from "react";
import { updateAccount } from "../client/requests";

const EditAccount = ({ account }) => {
  const [title, setTitle] = useState(account?.title);
  const [game, setGame] = useState(account?.game);
  const [combat, setCombat] = useState(account?.combat);
  const [type, setType] = useState(account?.type);
  const [status, setStatus] = useState(account?.status);
  const [email, setEmail] = useState(account?.email);
  const [time, setTime] = useState(account?.time);
  const [prevPrice, setPrevPrice] = useState(account?.prev_price);
  const [currPrice, setCurrPrice] = useState(account?.curr_price);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    const form = {
      title,
      game,
      combat,
      type,
      status,
      email,
      time,
      prev_price: prevPrice,
      curr_price: currPrice,
    };

    const res = await updateAccount(account._id, form);
    if (res.status === 500) {
      setError(true);
    }

    if (res.status === 200) {
      setSuccess(true);
    }
  };

  return (
    <div className={styles.edit__account}>
      <div className="global__container">
        <div className={styles.edit__account__wrapper}>
          <form onSubmit={handleUpdate} className={styles.edit__account__form}>
            <div className={styles.edit__account__form__input__container}>
              <p>title: </p>
              <input
                className={styles.edit__account__form__input}
                type="text"
                placeholder={account?.title}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className={styles.edit__account__form__input__container}>
              <p>game: </p>
              <input
                className={styles.edit__account__form__input}
                type="text"
                placeholder={account?.game}
                onChange={(e) => setGame(e.target.value)}
                value={game}
              />
            </div>

            <div className={styles.edit__account__form__input__container}>
              <p>combat: </p>
              <input
                className={styles.edit__account__form__input}
                type="number"
                placeholder={account?.combat}
                onChange={(e) => setCombat(e.target.value)}
                value={combat}
              />
            </div>

            <div className={styles.edit__account__form__input__container}>
              <p>account type: </p>
              <select
                className={styles.edit__account__form__input}
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value={account?.type}>{account?.type}</option>
                <option value="pure">pure</option>
                <option value="med level">med level</option>
                <option value="max main">max main</option>
                <option value="skiller">skiller</option>
              </select>
            </div>

            <div className={styles.edit__account__form__input__container}>
              <p>account status: </p>
              <input
                className={styles.edit__account__form__input}
                type="text"
                placeholder={account?.status}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              />
            </div>

            <div className={styles.edit__account__form__input__container}>
              <p>email status: </p>
              <input
                className={styles.edit__account__form__input}
                type="text"
                placeholder={account?.email}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className={styles.edit__account__form__input__container}>
              <p>delivery time: </p>
              <input
                className={styles.edit__account__form__input}
                type="number"
                placeholder={account?.time}
                onChange={(e) => setTime(e.target.value)}
                value={time}
              />
            </div>

            <div className={styles.edit__account__form__input__container}>
              <p>previous price: </p>
              <input
                className={styles.edit__account__form__input}
                type="number"
                placeholder={account?.prev_price ? account?.prev_price : "-"}
                onChange={(e) => setPrevPrice(e.target.value)}
                step="any"
              />
            </div>

            <div className={styles.edit__account__form__input__container}>
              <p>current price: </p>
              <input
                className={styles.edit__account__form__input}
                type="number"
                placeholder={account?.curr_price}
                onChange={(e) => setCurrPrice(e.target.value)}
                value={currPrice}
                step="any"
              />
            </div>

            <div className={styles.edit__account__form__btn__wrapper}>
              <button className={styles.edit__account__form__btn}>
                Update account
              </button>
            </div>
            {error && <h4 className="error">Check your inputs</h4>}
            {success && <h4 className="success">Account Updated!</h4>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
