import styles from "../styles/OrderComponent.module.css";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { getOrder } from "../client/requests";
import { CustomerEmailContext } from "../store/store";

const OrderComponent = () => {
  const { customerEmail, setCustomerEmail } = useContext(CustomerEmailContext);
  const [order, setOrder] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const intervalFunc = setInterval(() => {
      if (customerEmail !== "") {
        const getOrderFunc = async () => {
          const res = await getOrder(customerEmail);
          if (res.status === 200) setOrder(res.data[0]);
          if (res.status === 500) {
            setError(true);
          }
        };

        getOrderFunc();
      }
    }, 200);
    // change to 20000

    return () => clearInterval(intervalFunc);
  }, [customerEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getStatus = (idx) => {
    if (idx - order?.status < 1) return styles["done"];

    if (idx - order?.status === 1) return styles["in__progress"];

    if (idx - order?.status > 1) return styles["undone"];
  };

  return (
    <div className={styles.order__component}>
      <div className={styles.order__component__wrapper}>
        {order ? (
          <>
            <div className={styles.order__component__top}>
              <div className={styles.order__component__top__item}>
                <h3 className={styles.order__component__top__item__head}>
                  Order ID
                </h3>
                <p className={styles.order__component__top__item__body}>
                  {order?.orderId}
                </p>
              </div>

              <div className={styles.order__component__top__item}>
                <h3 className={styles.order__component__top__item__head}>
                  Customer
                </h3>
                <p className={styles.order__component__top__item__body}>
                  {order?.customer}
                </p>
              </div>

              <div className={styles.order__component__top__item}>
                <h3 className={styles.order__component__top__item__head}>
                  Total
                </h3>
                <p className={styles.order__component__top__item__body}>
                  ${order?.total}
                </p>
              </div>
            </div>

            <div className={styles.order__component__bottom}>
              <div
                className={`${
                  styles["order__component__bottom__item"]
                } + ${getStatus(0)}`}
              >
                <svg className={styles.order__component__bottom__item__head}>
                  <use xlinkHref="/svg/payment-done.svg#payment-done"></use>
                </svg>
                <p className={styles.order__component__bottom__item__desc}>
                  Payment
                </p>

                <div className={styles.order__component__img__wrapper}>
                  <Image
                    className={styles.order__component__img}
                    src="/images/checked.png"
                    layout="fill"
                    alt=""
                  />
                </div>
              </div>

              <div
                className={`${
                  styles["order__component__bottom__item"]
                } + ${getStatus(1)}`}
              >
                <svg className={styles.order__component__bottom__item__head}>
                  <use xlinkHref="/svg/payment-processing.svg#payment-processing"></use>
                </svg>
                <p className={styles.order__component__bottom__item__desc}>
                  Processing
                </p>
                <div className={styles.order__component__img__wrapper}>
                  <Image
                    className={styles.order__component__img}
                    src="/images/checked.png"
                    layout="fill"
                    alt=""
                  />
                </div>
              </div>

              <div
                className={`${
                  styles["order__component__bottom__item"]
                } + ${getStatus(2)}`}
              >
                <svg
                  className={
                    styles.order__component__bottom__item__head__delivered
                  }
                >
                  <use xlinkHref="/svg/package-delivered.svg#package-delivered"></use>
                </svg>

                <p className={styles.order__component__bottom__item__desc}>
                  Delivered
                </p>

                <div className={styles.order__component__img__wrapper}>
                  <Image
                    className={styles.order__component__img}
                    src="/images/checked.png"
                    layout="fill"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={styles.order__component__form}
          >
            <input
              className={styles.order__component__input}
              type="email"
              placeholder="email used in payment"
              onChange={(e) => setCustomerEmail(e.target.value)}
              value={customerEmail}
            />
            <div className={styles.order__component__btn__wrapper}>
              <button className={styles.order__component__btn}>check</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderComponent;
