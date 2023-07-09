import Image from "next/image";
import styles from "../styles/CartDetails.module.css";
import { useShopValue } from "../context/ShopProvider";
import { useState } from "react";

const CartDetails = () => {
  const [{ basket }, dispatch] = useShopValue();

  const handleDelete = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id,
    });
  };

  return (
    <div className={styles.cart__details}>
      {basket?.map((item, idx) => (
        <div key={idx} className={styles.cart__details__wrapper}>
          <div className={styles.cart__details__image__wrapper}>
            <Image
              className={styles.cart__details__image}
              src={`/images/accounts/${item?.image}`}
              layout="fill"
              alt=""
            />
          </div>
          <div className={styles.cart__details__text}>
            <h4 className={styles.cart__details__title}>{item?.title}</h4>
            <div className={styles.card__details__text__body}>
              <p className={styles.card__details__price}>${item?.price}</p>
              <p className={styles.card__details__quantity}>x{item?.count}</p>
            </div>
          </div>
          <svg
            onClick={() => handleDelete(item?.id)}
            className={styles.card__details__delete}
          >
            <use xlinkHref="/svg/close-sharp.svg#close-sharp"></use>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CartDetails;
