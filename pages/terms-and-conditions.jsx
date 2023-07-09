import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/Terms.module.css";

export default function Terms() {
  return (
    <div className={styles.terms}>
      <div className="global__container">
        <Navbar />
        <div className={styles.terms__wrapper}>
          <h3>Terms and Conditions</h3>
          <p className={styles.terms__block}>
            <span>GPCHEST</span> may request additional documentation for
            certain orders to verify the legitimacy of your payment such as:
          </p>

          <ul className={styles.terms__list}>
            <li>Goverment-Issued Photo ID</li>
            <li>Picture of Card to verify last 4 digits</li>
            <li>Others.</li>
          </ul>

          <p className={styles.terms__block}>
            These documents will help <span>GPCHEST</span> determine whether the
            payment has been authorized by you and to prevent fraud/chargebacks.
            If you do not comply we will refund your payment. Identity
            verification methods helps The Company prevent fraud. Failure to
            comply with The Company&#39;s request may result in 24 hour payment
            seizure and/or a refund of your payment. The Company reserves the
            right to refuse business to you if you do not complete the requested
            identity verification.
          </p>

          <p className={styles.terms__block}>
            Once your gold has been delivered you are held accountable for any
            unauthorized access to your account. We will NEVER ask you to trade
            the gold back to us. Verifying it is you in trade screen accepting
            the trade will be treated as completed delivery and free{" "}
            <span>GPCHEST</span> of any responsibility. Furthermore, once the
            gold has been delivered to you, it becomes your responsibility.
          </p>

          <p className={styles.terms__block}>
            By purchasing goods on <span>GPCHEST</span> you accept all risks
            associated with your in-game account/wealth.
          </p>

          <p className={styles.terms__block}>
            The use of VPN/Proxy/VPS services are prohibited on GPCHEST.
          </p>

          <h4>Account Purchase Terms:</h4>

          <ul className={styles.terms__list}>
            <li>
              We will never refund an account purchase after delivering the
              account details. Sales are final once account details have been
              sent. - We are NEVER responsible for any wealth on the account(s)
              at any time.
            </li>
            <li>
              Blackmarks, offenses, bans, mutes, locks, any offense placed on
              the account(s) is not our responsibility after we delivered the
              account details.
            </li>
            <li>
              We&#39;ll help you recover/unlock the account if it needs to get
              recovered or if it gets locked within 31 days after the sale, And
              if we&#39;re unable to unlock the account for whatever reason
              within 31 days after the sale you&#39;re getting a replacement
              account, or if you don&#39;t want a replacement you can get
              OSRS/RS3 Gold totaling the account purchase price for the rate we
              sell at at the time of you collecting the gold.
            </li>

            <li>
              For if the account needs to get recovered/unlocked: After 31 days
              of the sale the warranty ends. We&#39;ll still help recover/unlock
              the account to the best of our ability but after 31 days we are
              not giving any refund, replacement or store credit if we&#39;re
              unable to recover/unlock the account (for if You ask us to
              recover/unlock your purchased account(s)).
            </li>

            <li>
              Re-selling of accounts purchased from www.GPCHEST.com iinstantly
              causes any warranty void. By purchasing an account from us, you
              automatically consent to said terms.
            </li>
          </ul>

          <h4>
            Refunds are returned to the buyer within 1-3 business days if the
            buyer goes over the allowed purchase limit or shows sign of
            attempted fraud/theft.
          </h4>

          <p className={styles.terms__block}>
            All copyrights and trademarks are the property of their respective
            owners. <span>GPCHEST</span> has no affiliation with Runescape,
            Valve, or any other game publisher.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
