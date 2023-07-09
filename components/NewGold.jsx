import styles from "../styles/NewGold.module.css";
import { useState } from "react";
import { createGoldPrice } from "../client/requests";

const NewGold = () => {
  const [type, setType] = useState("rs3");
  const [trade, setTrade] = useState("sell");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    const form = {
      type,
      trade,
      price,
    };
    const res = await createGoldPrice(form);

    if (res.status === 500) {
      setError(true);
    }

    if (res.status === 201) {
      setSuccess(true);
      setType("rs3");
      setTrade("sell");
      setPrice("");
    }
  };

  return (
    <div className={styles.new__gold}>
      <div className="global__container">
        <div className={styles.new__gold__wrapper}>
          <form onSubmit={handleSubmit} className={styles.new__gold__form}>
            <div className={styles.new__gold__form__input__container}>
              <p>type: </p>
              <select
                onChange={(e) => setType(e.target.value)}
                className={styles.new__gold__form__input}
                value={type}
              >
                <option value="rs3">rs3</option>
                <option value="osrs">osrs</option>
              </select>
            </div>

            <div className={styles.new__gold__form__input__container}>
              <p>trade: </p>
              <select
                onChange={(e) => setTrade(e.target.value)}
                className={styles.new__gold__form__input}
                value={trade}
              >
                <option value="sell">sell</option>
                <option value="buy">buy</option>
              </select>
            </div>

            <div className={styles.new__gold__form__input__container}>
              <p>price: </p>
              <input
                className={styles.new__gold__form__input__price}
                type="number"
                placeholder="price in dollar"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div className={styles.new__gold__form__btn__wrapper}>
              <button className={styles.new__gold__form__btn}>
                Create Gold
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

export default NewGold;
