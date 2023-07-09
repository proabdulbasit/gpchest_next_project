import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Privacy.module.css";

export default function Refund() {
  return (
    <div className={styles.privacy}>
      <div className="global__container">
        <Navbar />
        <div className={styles.privacy__wrapper}>
          <h3>refund policy</h3>
          <p className={styles.privacy__block}>
            After completed purchase, we deliver goods as quick as possible,
            usually within few minutes. If a customer insists on getting their
            money back, we offer a full refund, but it can be only done before
            delivery of goods/services.
          </p>

          <p className={styles.privacy__block}>
            Keep in mind that refund might take up to a week, it depends on the
            payment method.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
