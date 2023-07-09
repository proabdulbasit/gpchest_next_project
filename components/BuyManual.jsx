import Image from "next/image";
import styles from "../styles/BuyManual.module.css";

const BuyManual = () => {
  return (
    <div className={styles.buymanual}>
      <h5 className={styles.buymanual__how__title}>
        How do i buy Rs3 or OSRS Gold ❓
      </h5>
      <div className={styles.buymanual__how}>
        <p>
          Toggle the button to buy either RS3 or OSRS Golds as in the image
          below
        </p>
        <div className={styles.buymanual__image__wrapper}>
          <Image
            className={styles.buymanual__image}
            src="/images/manual.png"
            layout="fill"
            alt=""
          />
        </div>
      </div>
      <div className={styles.buymanual__wrapper}>
        <div className={styles.buymanual__item}>
          <h6 className={styles.buymanual__number}>1</h6>
          <div className={styles.buymanual__detail}>
            <h4>Enter the amount of gold you wish to purchase</h4>
            <p>
              As you enter a certain amount of gold, the right dialog box
              displays how much the entered gold costs
            </p>
          </div>
        </div>

        <div className={styles.buymanual__item}>
          <h6 className={styles.buymanual__number}>2</h6>
          <div className={styles.buymanual__detail}>
            <h4>Enter your Runescape character name</h4>
            <p>The character name will be associated with the purchased gold</p>
          </div>
        </div>

        <div className={styles.buymanual__item}>
          <h6 className={styles.buymanual__number}>3</h6>
          <div className={styles.buymanual__detail}>
            <h4>Click on the Add to Cart button</h4>
          </div>
        </div>

        <div className={styles.buymanual__item}>
          <h6 className={styles.buymanual__number}>4</h6>
          <div className={styles.buymanual__detail}>
            <h4>Proceed to Checkout</h4>
            <p>
              After clicking the button, you will be redirected to the checkout
              page, where you will see all the items in your cart
            </p>
          </div>
        </div>

        <div className={styles.buymanual__item}>
          <h6 className={styles.buymanual__number}>5</h6>
          <div className={styles.buymanual__detail}>
            <h4>Enter your Email</h4>
            <p>
              There will be a field in the summary box asking for your email
            </p>
          </div>
        </div>

        <div className={styles.buymanual__item}>
          <h6 className={styles.buymanual__number}>6</h6>
          <div className={styles.buymanual__detail}>
            <h4>Proceed to Payment</h4>
            <p>
              There are two payment methods available to choose from. click on
              your choice and make payment.
            </p>
          </div>
        </div>

        <div className={styles.buymanual__item}>
          <h6 className={styles.buymanual__number}>7</h6>
          <div className={styles.buymanual__detail}>
            <h4>Getting your Gold</h4>
            <p>
              After successful payment, you will receive an Order id which you
              will have to copy. Click on the live chat button at the right
              buttom corner, enter your email and paste the Order Id
            </p>
          </div>
        </div>

        <div className={styles.buymanual__item}>
          <h6 className={styles.buymaunual__last__number}>8</h6>
          <div className={styles.buymanual__detail}>
            <h4>Congratulations🎉🍾</h4>
            <p>
              After pasting the Order Id in the live chat.
              <br /> Viola❗❗ the gold you purchased is in your inventory. Make
              sure to leave a feedback about our service and make us your one
              stop for RS3, OSRS gold purchases
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyManual;
