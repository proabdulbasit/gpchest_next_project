import Footer from "../../components/Footer";
import styles from "../../styles/Reviews.module.css";
import Navbar from "../../components/Navbar";
import ReviewComponent from "../../components/ReviewComponent";
import { getReviews } from "../../client/requests";

export default function Reviews({ reviews }) {
  return (
    <div className={styles.reviews}>
      <Navbar />
      <ReviewComponent reviews={reviews} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const { data } = await getReviews();
  return {
    props: {
      reviews: data,
    },
  };
}
