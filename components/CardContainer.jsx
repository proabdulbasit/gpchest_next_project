import Image from "next/image";
import styles from "../styles/CardContainer.module.css";
import { useState, useRef, useEffect, useContext } from "react";
import { CurrencyContext, GoldContext } from "../store/store";
import { useShopValue } from "../context/ShopProvider";

const CardContainer = ({ sellOpts, buyOpts }) => {
  const opts = sellOpts ? true : false;
  const goldOpts = sellOpts ? sellOpts : buyOpts;
  const [name, setName] = useState("");
  const [goldPrice, setGoldPrice] = useState("");
  const [equivPrice, setEquivPrice] = useState("");
  const [goldType, setGoldType] = useState("rs3");
  const [gold, setGold] = useState();
  const { currency } = useContext(CurrencyContext);
  const { setSellGold } = useContext(GoldContext);
  const osrsRef = useRef();
  const rs3Ref = useRef();
  const [goldRate, setGoldRate] = useState();
  const [{ basket }, dispatch] = useShopValue();

  useEffect(() => {
    if (goldPrice !== "") {
      calcPrice(goldPrice);
    }
  }, [goldType, currency]);

  useEffect(() => {
    setGold(goldOpts.filter((opt) => opt.type === goldType)[0]);
  }, []);

  useEffect(() => {
    if (gold) {
      showGoldRate();
    }
  }, [gold, goldType, currency]);

  function handleGoldTransaction(e, addToCart) {
    e.preventDefault();
    if (addToCart) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: gold?._id,
          title: `${gold?.type} gold`,
          price: equivPrice,
          image: "coin.png",
          count: 1,
          name,
        },
      });
      console.log("item added");
    } else {
      setSellGold([
        {
          title: gold?.type,
          price: goldPrice,
        },
      ]);
    }
  }

  function calcPrice(price) {
    setEquivPrice(
      Math.round((price * gold.price * currency.rate + Number.EPSILON) * 100) /
        100
    );
  }

  function showGoldRate() {
    setGoldRate(
      Math.round((gold.price * currency.rate + Number.EPSILON) * 100) / 100
    );
  }

  const handlePrice = (price) => {
    setGoldPrice(price);
    calcPrice(price);
  };

  const handleRS3Switch = (type) => {
    rs3Ref.current.setAttribute("option-selected", "true");
    osrsRef.current.setAttribute("option-selected", "false");
    setGold(goldOpts.filter((opt) => opt.type === type)[0]);
    setGoldType(type);
    showGoldRate();
  };

  const handleOSRSSwitch = (type) => {
    osrsRef.current.setAttribute("option-selected", "true");
    rs3Ref.current.setAttribute("option-selected", "false");
    setGold(goldOpts.filter((opt) => opt.type === type)[0]);
    setGoldType(type);
    showGoldRate();
  };

  return (
    <div className={styles.card__container}>
      <div className={styles.card__wrapper}>
        <div className={styles.card}>
          <Image
            className={styles.card__image}
            src="/images/map.png"
            layout="fill"
            alt="card"
          />

          <div className={styles.card__switch}>
            <h5
              option-selected="true"
              ref={rs3Ref}
              onClick={() => handleRS3Switch("rs3")}
              className={styles.card__switch__option}
            >
              RS3
            </h5>
            <h5
              ref={osrsRef}
              onClick={() => handleOSRSSwitch("osrs")}
              className={styles.card__switch__option}
            >
              OSRS
            </h5>
          </div>

          <div className={styles.card__info__container}>
            <div className={styles.card__info}>
              <div className={styles.card__info__top}>
                <div className={styles.card__horizontal__line}></div>
                <p>
                  {currency.curr} {goldRate}/M
                </p>
                <div className={styles.card__horizontal__line}></div>
              </div>

              <form className={styles.card__form}>
                <div className={styles.card__digits__wrapper}>
                  <div className={styles.card__input__wrapper}>
                    <svg className={styles.card__coin}>
                      <use xlinkHref="/svg/coin.svg#coin"></use>
                    </svg>
                    <input
                      onChange={(e) => handlePrice(e.target.value)}
                      value={goldPrice}
                      type="number"
                      className={styles.card__input}
                    />
                  </div>

                  <svg className={styles.card__swap}>
                    <use xlinkHref="/svg/arrow-swap-horizontal.svg#arrow-swap-horizontal"></use>
                  </svg>

                  <div className={styles.card__input__wrapper}>
                    <Image
                      className={styles.card__flags}
                      src={`/images/flags/${currency.curr}.png`}
                      width={28}
                      height={18}
                      alt="country"
                    />
                    <input
                      readOnly
                      value={equivPrice}
                      type="number"
                      className={styles.card__input}
                    />
                  </div>
                </div>

                <div className={styles.card__form__btm}>
                  <input
                    className={styles.card__form__name}
                    placeholder="Runescape character name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />

                  <div>
                    <div className={styles.card__form__submit}>
                      <button
                        onClick={(e) => handleGoldTransaction(e, opts)}
                        className={styles.card__submit__btn}
                      >
                        {opts ? "Add to Cart" : "Sell"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles["card__wrapper"]} + ${styles["card__wrapper__rotate"]}`}
      >
        <div className={styles.card}>
          <Image
            className={styles.card__image}
            src="/images/map.png"
            layout="fill"
            alt="card"
          />

          <div className={styles.card__switch}>
            <h5
              // ref={rs3Ref}
              // onClick={() => handleRS3Switch("rs3")}
              className={styles.card__switch__option}
            >
              RS3
            </h5>
            <h5
              // ref={osrsRef}
              // onClick={() => handleOSRSSwitch("osrs")}
              className={styles.card__switch__option}
            >
              OSRS
            </h5>
          </div>

          <div className={styles.card__info__container}>
            <div className={styles.card__info}>
              <div className={styles.card__info__top}>
                <div className={styles.card__horizontal__line}></div>
                <p>
                  {currency.curr} {goldRate}/M
                </p>
                <div className={styles.card__horizontal__line}></div>
              </div>

              <form className={styles.card__form}>
                <div className={styles.card__digits__wrapper}>
                  <div className={styles.card__input__wrapper}>
                    <svg className={styles.card__coin}>
                      <use xlinkHref="/svg/coin.svg#coin"></use>
                    </svg>
                    <input
                      onChange={(e) => handlePrice(e.target.value)}
                      value={goldPrice}
                      type="text"
                      className={styles.card__input}
                    />
                  </div>

                  <svg className={styles.card__coin}>
                    <use xlinkHref="/svg/arrow-swap-horizontal.svg#arrow-swap-horizontal"></use>
                  </svg>

                  <div className={styles.card__input__wrapper}>
                    <Image
                      className={styles.card__flags}
                      src="/images/flags/nok.png"
                      width={28}
                      height={18}
                      alt="country"
                    />
                    <input
                      value={equivPrice}
                      readOnly
                      type="text"
                      className={styles.card__input}
                    />
                  </div>
                </div>

                <div className={styles.card__form__btm}>
                  <input
                    className={styles.card__form__name}
                    placeholder="Runescape character name"
                    type="text"
                  />

                  <div>
                    <div className={styles.card__form__submit}>
                      <button className={styles.card__submit__btn}>
                        {opts ? "Add to Cart" : "Sell"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
