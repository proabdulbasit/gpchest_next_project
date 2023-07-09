import styles from "../styles/Service.module.css";

const Service = () => {
  return (
    <div className="global__container">
      <div className={styles.service}>
        <div className={styles.services__wrapper}>
          <div className={styles.service__item}>
            <svg className={`${styles["service__icon"]} + ${styles["first"]}`}>
              <use xlinkHref="/svg/fast-delivery.svg#fast-delivery"></use>
            </svg>
            <h3>fast delivery</h3>
          </div>

          <div className={styles.service__item}>
            <svg className={`${styles["service__icon"]} + ${styles["second"]}`}>
              <use xlinkHref="/svg/earth.svg#earth"></use>
            </svg>
            <h3>world renown</h3>
          </div>

          <div className={styles.service__item}>
            <svg className={`${styles["service__icon"]} + ${styles["third"]}`}>
              <use xlinkHref="/svg/live-chat.svg#live-chat"></use>
            </svg>
            <h3>24/7 live chat</h3>
          </div>

          <div className={styles.service__item}>
            <svg className={`${styles["service__icon"]} + ${styles["fourth"]}`}>
              <use xlinkHref="/svg/best-price.svg#best-price"></use>
            </svg>
            <h3>best prices</h3>
          </div>

          <div className={styles.service__item}>
            <svg className={`${styles["service__icon"]} + ${styles["fifth"]}`}>
              <use xlinkHref="/svg/coins-stacked-palm.svg#coins-stacked-palm"></use>
            </svg>
            <h3>always stocked</h3>
          </div>

          <div className={styles.service__item}>
            <svg className={`${styles["service__icon"]} + ${styles["sixth"]}`}>
              <use xlinkHref="/svg/secure.svg#secure"></use>
            </svg>
            <h3>100% secure</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
