import Image from "next/image";
import styles from "../styles/AccountCard.module.css";
import { useShopValue } from "../context/ShopProvider";

const AccountCard = ({ account }) => {
  const [{ basket }, dispatch] = useShopValue();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: account?._id,
        title: account?.title,
        price: account?.curr_price,
        count: 1,
        image: account?.image,
      },
    });
  };
  return (
    <div className={styles.account__card}>
      <h3 className={styles.account__card__title}>{account?.title}</h3>
      <div className={styles.account__card__image__wrapper}>
        <Image
          className={styles.account__card__image}
          src={`/images/accounts/${account?.image}`}
          layout="fill"
          alt=""
        />
      </div>
      <div className={styles.account__card__details}>
        <div className={styles.account__card__detail}>
          <p className={styles.account__card__item__key}>Game:</p>
          <p className={styles.account__card__item__value}>{account?.game}</p>
        </div>

        <div className={styles.account__card__detail}>
          <p className={styles.account__card__item__key}>Combat:</p>
          <p className={styles.account__card__item__value}>{account?.combat}</p>
        </div>

        <div className={styles.account__card__detail}>
          <p className={styles.account__card__item__key}>Account Type:</p>
          <p className={styles.account__card__item__value}>{account?.type}</p>
        </div>

        <div className={styles.account__card__detail}>
          <p className={styles.account__card__item__key}>Account Status:</p>
          <p className={styles.account__card__item__value}>{account?.status}</p>
        </div>

        <div className={styles.account__card__detail}>
          <p className={styles.account__card__item__key}>Email Status:</p>
          <p className={styles.account__card__item__value}>{account?.email}</p>
        </div>

        <div className={styles.account__card__detail}>
          <p className={styles.account__card__item__key}>Delivery Time:</p>
          <p
            className={`${styles["account__card__item__value"]} + ${styles["account__card__item__time"]}`}
          >
            ~0-{account?.time}H
          </p>
        </div>

        <div className={styles.account__card__detail}>
          <p className={styles.account__card__item__key}>Price:</p>
          <p
            className={`${styles["account__card__item__value"]} + ${styles["account__card__item__price__container"]}`}
          >
            {account?.prev_price && (
              <span className={styles.account__card__price__former}>
                ${account?.prev_price}
              </span>
            )}
            <span className={styles.account__card__price__present}>
              ${account?.curr_price}
            </span>
          </p>
        </div>
      </div>

      <div className={styles.account__card__btn__wrapper}>
        <button onClick={addToCart} className={styles.account__card__btn}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
