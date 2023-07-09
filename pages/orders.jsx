import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Order.module.css";
import OrderComponent from "../components/OrderComponent";

export default function Order() {
  return (
    <div className={styles.order}>
      <div className="global__container">
        <Navbar />
        <div className={styles.order__wrapper}>
          <OrderComponent />
        </div>
        <Footer />
      </div>
    </div>
  );
}
