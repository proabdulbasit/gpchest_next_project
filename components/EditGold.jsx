import { useState } from "react";
import styles from "../styles/EditGold.module.css";
import { updateGoldPrice } from "../client/requests";

const EditGold = ({ goldPrice }) => {
  const [type, setType] = useState(goldPrice?.type);
  const [trade, setTrade] = useState(goldPrice?.trade);
  const [price, setPrice] = useState(goldPrice?.price);
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

    const res = await updateGoldPrice(goldPrice._id, form);
    if (res.status === 500) {
      setError(true);
    }

    if (res.status === 201) {
      setSuccess(true);
    }
  };

  return (
    <div className={styles.edit__gold}>
      <div className="global__container">
        <div className={styles.edit__gold__wrapper}>
          <div className={styles.edit__gold__messages}>
            {error && <h4 className="error">Check your inputs</h4>}
            {success && <h4 className="success">Account Updated!</h4>}
          </div>
          <form onSubmit={handleSubmit} className={styles.edit__gold__form}>
            <div className={styles.edit__gold__form__input__container}>
              <p>type: </p>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={styles.edit__gold__form__input}
              >
                <option value="rs3">rs3</option>
                <option value="osrs">osrs</option>
              </select>
            </div>

            <div className={styles.edit__gold__form__input__container}>
              <p>trade: </p>
              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className={styles.edit__gold__form__input}
              >
                <option value="sell">sell</option>
                <option value="buy">buy</option>
              </select>
            </div>

            <div className={styles.edit__gold__form__input__container}>
              <p>price: </p>
              <input
                className={styles.edit__gold__form__input__price}
                type="number"
                placeholder="price in dollar"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className={styles.edit__gold__form__btn__wrapper}>
              <button className={styles.edit__gold__form__btn}>
                Update Gold
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGold;
