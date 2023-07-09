import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CheckoutComponent from "../components/CheckoutComponent";
import styles from "../styles/Checkout.module.css";

export default function Checkout() {
  return (
    <div className={styles.checkout}>
      <div className="global__container">
        <Navbar />
        <div className={styles.checkout__wrapper}>
          <CheckoutComponent />
        </div>
        <Footer />
      </div>
    </div>
  );
}
