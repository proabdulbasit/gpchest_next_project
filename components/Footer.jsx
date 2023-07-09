import styles from "../styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="global__container">
        <div className={styles.footer__wrapper}>
          <div className={styles.footer__icon}>
            <h3>GP</h3>
            <svg className={styles.footer__icon__moon}>
              <use xlinkHref="/svg/half-moon.svg#half-moon"></use>
            </svg>
            <h3>HEST</h3>
          </div>

          <div className={styles.footer__items}>
            <div className={styles.footer__item}>
              <h3>purchase</h3>
              <ul className={styles.footer__list}>
                <Link href={"/buy-golds"}>
                  <li>Buy Golds</li>
                </Link>
                <Link href={"/accounts"}>
                  <li>Buy Accounts</li>
                </Link>
                <Link href={"/sell-golds"}>
                  <li>Sell Golds</li>
                </Link>
              </ul>
            </div>

            <div className={styles.footer__item}>
              <h3>gpchest</h3>
              <ul className={styles.footer__list}>
                <Link href={"/reviews"}>
                  <li>Feedback</li>
                </Link>
                <Link href={"/privacy-policy"}>
                  <li>Privacy Policy</li>
                </Link>
                <Link href={"/refund-policy"}>
                  <li>Refund Policy</li>
                </Link>
                <Link href={"/terms-and-conditions"}>
                  <li>Terms and Conditions</li>
                </Link>
              </ul>
            </div>
          </div>

          <div className={styles.footer__terms}>
            <p>Office No. 10, Main Indus highway, Fazilpur, Pakistan.</p>
            <p>Copyrights GPCHEST &copy; 2023. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
