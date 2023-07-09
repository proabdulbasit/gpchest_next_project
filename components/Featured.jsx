import Image from "next/image";
import styles from "../styles/Featured.module.css";

const Featured = () => {
  return (
    <div className="global__container">
      <div className={styles.featured__wrapper}>
        <div className={styles.featured__image__wrapper}>
          <Image
            className={styles.featured__image}
            src="/images/art.jpg"
            alt="featured image"
            layout="fill"
          />
        </div>
        <div className={styles.featured__overlay}></div>
        <div className={styles.featured__text__wrapper}>
          <div className={styles.featured__middle__btm__wrapper}>
            <h4 className={styles.featured__text__middle}>
              The <span>🏆 1 Runescape Gold </span>Website
            </h4>
            <h5 className={styles.featured__text__bottom}>
              We are your top suppliers for Runescape Gold
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
