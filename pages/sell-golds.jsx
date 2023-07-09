import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardContainer from "../components/CardContainer";
import styles from "../styles/SellGold.module.css";
import { getGoldPrices } from "../client/requests";
import SellManual from "../components/SellManual";

export default function BuyGold({ goldPrices }) {
  const buyOpts = goldPrices.filter((goldPrice) => goldPrice.trade === "buy");

  return (
    <div className={styles.sellgold}>
      <div className="global__container">
        <Navbar />
        <div className={styles.sellgold__wrapper}>
          <div className={styles.sellgold__container}>
            <div className={styles.sellgold__text}>
              <h1>Best deals on RS3 and OSRS Golds</h1>
              <p>We also support buying RS3 and OSRS gold at rates 🔥</p>
            </div>
            <div className={styles.sellgold__card__wrapper}>
              <CardContainer buyOpts={buyOpts} />
            </div>

            <div className={styles.sellgold__manual__wrapper}>
              <SellManual />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await getGoldPrices();

  return {
    props: {
      goldPrices: data,
    },
  };
}
