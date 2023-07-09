import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AccountComponent from "../../components/AccountComponent";
import styles from "../../styles/Accounts.module.css";
import { getAccounts } from "../../client/requests";

export default function Accounts({ accounts }) {
  return (
    <div className={styles.accounts}>
      <div className="global__container">
        <Navbar />
        <div className={styles.accounts__wrapper}>
          <AccountComponent accounts={accounts} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await getAccounts();
  return {
    props: {
      accounts: data,
    },
  };
}
