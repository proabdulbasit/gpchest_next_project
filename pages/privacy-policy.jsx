import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Privacy.module.css";

export default function Privacy() {
  return (
    <div className={styles.privacy}>
      <div className="global__container">
        <Navbar />
        <div className={styles.privacy__wrapper}>
          <h3>privacy policy</h3>
          <p className={styles.privacy__block}>
            At <span>GPCHEST</span>, we care deeply about privacy, we believe in
            transparency, and we &#39;re committed to be upfront abut our
            privacy practices, including how we treat your personal information.
            We Know you care about your privacy too.
          </p>

          <h4>collection of personal data</h4>

          <p className={styles.privacy__block}>
            Like other websites we keep chat logs, visitor &#39;s IP address.
          </p>

          <p className={styles.privacy__block}>
            Where authentication is required, visitor &#39;s email will be
            stored on the server.
          </p>

          <p className={styles.privacy__block}>
            <span>GPCHEST</span> will not sell your Information to third
            parties(or anyone for that matter), except when required by law
            officials. We reserve the right to release your photo ID, IP
            address, chat logs, and email address incase fraud has been
            committed against our company to our payment services
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
