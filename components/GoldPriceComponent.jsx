import Link from "next/link";
import styles from "../styles/GoldPriceComponent.module.css";
import { useState } from "react";
import { deleteGold } from "../client/requests";

const GoldPriceComponent = ({ goldPrices }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [goldData, setGoldData] = useState(goldPrices);

  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    const res = await deleteGold(id);
    if (res.status === 200) {
      setSuccess(true);
      setGoldData(goldData.filter((gold) => gold._id !== id));
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.gold__price__component}>
      <div className="global__container">
        <div className={styles.gold__price__component__messages}>
          {error && (
            <span className="error">Something went wrong! try again.</span>
          )}
          {success && <span className="success">Post Deleted!.</span>}
        </div>
        <div className={styles.gold__price__component__wrapper}>
          {goldData?.map((gold, idx) => (
            <div key={idx} className={styles.gold__price__component__item}>
              <Link href={`/admin/gold/${gold?._id}`}>
                <div className={styles.gold__price__component__info__wrapper}>
                  <div
                    className={styles.gold__price__component__info__container}
                  >
                    <p className={styles.gold__price__component__info}>type:</p>{" "}
                    <p className={styles.gold__price__component__value__type}>
                      {gold?.type}
                    </p>
                  </div>

                  <div
                    className={styles.gold__price__component__info__container}
                  >
                    <p className={styles.gold__price__component__info}>
                      trade:
                    </p>{" "}
                    <p className={styles.gold__price__component__value}>
                      {gold?.trade}
                    </p>
                  </div>

                  <div
                    className={styles.gold__price__component__info__container}
                  >
                    <p className={styles.gold__price__component__info}>
                      price:
                    </p>{" "}
                    <p className={styles.gold__price__component__value}>
                      ${gold?.price}
                    </p>
                  </div>
                </div>
              </Link>

              <div className={styles.gold__price__component__btn__wrapper}>
                <svg
                  onClick={() => handleDelete(gold?._id)}
                  className={styles.gold__price__component__icon}
                >
                  <use xlinkHref="/svg/delete.svg#delete"></use>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoldPriceComponent;
