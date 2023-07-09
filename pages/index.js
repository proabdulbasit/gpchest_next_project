import Head from "next/head";
import CardContainer from "../components/CardContainer";
import CommentContainer from "../components/CommentContainer";
import BuyManual from "../components/BuyManual";
import SellManual from "../components/SellManual";
import Featured from "../components/Featured";
import Navbar from "../components/Navbar";
import Service from "../components/Service";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
import {
  getGoldPrices,
  getRandomReviews,
  getUser,
  getRandomBlogs,
} from "../client/requests";
import { useContext, useEffect, useRef } from "react";
import { AdEmailContext, setWelcomeNotify, PlayContext } from "../store/store";
import MoreInfo from "../components/MoreInfo";
import FeaturedBlogs from "../components/FeaturedBlogs";

export default function Home({ adEmail, goldPrices, randomReviews, blogs }) {
  const { setAdEmail } = useContext(AdEmailContext);
  const { setNotify } = useContext(setWelcomeNotify);
  const { setPlay } = useContext(PlayContext);

  const buyOpts = goldPrices.filter((goldPrice) => goldPrice.trade === "buy");

  const sellOpts = goldPrices.filter((goldPrice) => goldPrice.trade === "sell");

  const indexRef = useRef();

  useEffect(() => {
    if (indexRef && indexRef.current?.visibilityState !== "hidden") {
      setTimeout(() => {
        setNotify(true);
        setPlay(true);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    setAdEmail(adEmail[0]?.email);
  }, [adEmail]);

  return (
    <div className={styles.home__container} ref={indexRef}>
      <Head>
        <title>GPChest</title>
        {/* <link rel="icon" href="/svg/half" /> */}
      </Head>
      <div className="global__container">
        <Navbar />

        <main className={styles.main}>
          <Featured />
          <div className={styles.home__gold__wrapper}>
            <div className={styles.home__card__wrapper}>
              <CardContainer sellOpts={sellOpts} />
            </div>
            <BuyManual />
          </div>

          <div className={styles.home__gold__wrapper__sell}>
            <div className={styles.home__card__wrapper}>
              <CardContainer buyOpts={buyOpts} />
            </div>
            <SellManual />
          </div>

          <Service />
          <CommentContainer randomReviews={randomReviews} />
          <MoreInfo />
          {/* <FeaturedBlogs blogs={blogs} /> */}
        </main>

        <footer className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const [goldPricesRes, randomReviewRes, adEmail, randomBlogRes] =
    await Promise.all([
      await getGoldPrices(),
      await getRandomReviews(),
      await getUser(),
      await getRandomBlogs(),
    ]);

  return {
    props: {
      goldPrices: goldPricesRes.data,
      randomReviews: randomReviewRes.data,
      adEmail: adEmail.data,
      blogs: randomBlogRes.data,
    },
  };
}
