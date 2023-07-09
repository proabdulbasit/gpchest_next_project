import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardContainer from "../components/CardContainer";
import styles from "../styles/BuyGold.module.css";
import { getGoldPrices } from "../client/requests";
import BuyManual from "../components/BuyManual";

export default function BuyGold({ goldPrices }) {
  const sellOpts = goldPrices.filter((goldPrice) => goldPrice.trade === "sell");

  return (
    <div className={styles.buygold}>
      <div className="global__container">
        <Navbar />
        <div className={styles.buygold__wrapper}>
          <div className={styles.buygold__container}>
            <div className={styles.buygold__text}>
              <h1>Best deals on RS3 and OSRS Golds </h1>
              <p>
                We always offer and deliver the best affordable RS3 and OSRS
                gold prices 🔥
              </p>
            </div>
            <div className={styles.buygold__card__wrapper}>
              <CardContainer sellOpts={sellOpts} />
            </div>

            <div className={styles.buygold__manual__wrapper}>
              <BuyManual />
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
