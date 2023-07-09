import Image from "next/image";
import styles from "../styles/SellManual.module.css";

const SellManual = () => {
  return (
    <div className={styles.sellmanual}>
      <h5 className={styles.sellmanual__how__title}>
        How do i sell Rs3 or OSRS Gold ❓
      </h5>
      <div className={styles.sellmanual__how}>
        <p>
          Toggle the button to sell either RS3 or OSRS Golds as in the image
          below
        </p>
        <div className={styles.sellmanual__image__wrapper}>
          <Image
            className={styles.sellmanual__image}
            src="/images/manual.png"
            layout="fill"
            alt=""
          />
        </div>
      </div>
      <div className={styles.sellmanual__wrapper}>
        <div className={styles.sellmanual__item}>
          <h6 className={styles.sellmanual__number}>1</h6>
          <div className={styles.sellmanual__detail}>
            <h4>Enter the amount of gold you wish to sell</h4>
            <p>
              As you enter a certain amount of gold, the right dialog box
              displays the cost equivalent of the gold.
            </p>
          </div>
        </div>

        <div className={styles.sellmanual__item}>
          <h6 className={styles.sellmanual__number}>2</h6>
          <div className={styles.sellmanual__detail}>
            <h4>Enter your Runescape character name</h4>
            <p>
              The character name will be associated with the gold you wish to
              sell
            </p>
          </div>
        </div>

        <div className={styles.sellmanual__item}>
          <h6 className={styles.sellmanual__number}>3</h6>
          <div className={styles.sellmanual__detail}>
            <h4>Click on the Sell button</h4>
          </div>
        </div>

        <div className={styles.sellmanual__item}>
          <h6 className={styles.sellmanual__number}>4</h6>
          <div className={styles.sellmanual__detail}>
            <h4>Chat with a GPChest Customer Service.</h4>
            <p>
              The details of the gold you choose to sell will be in the input
              field of the chat, all you need to do is press the send button or
              hit the enter key on your keyboard, then follow the easy step by
              step instructions given by the customer service.
            </p>
          </div>
        </div>

        <div className={styles.sellmanual__item}>
          <h6 className={styles.sellmaunual__last__number}>5</h6>
          <div className={styles.sellmanual__detail}>
            <h4>Congratulations🎉🍾</h4>
            <p>
              Viola❗❗ You&#39;ve sold your gold. Make sure to leave a feedback
              about our service and make us your one stop for RS3, OSRS gold
              purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellManual;
