import styles from "../../styles/Ads.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Alogin from "../../components/Alogin";

export default function Admin() {
  return (
    <div className={styles.ads}>
      <Navbar />
      <Alogin />
      <Footer />
    </div>
  );
}
