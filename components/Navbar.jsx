import styles from "../styles/Navbar.module.css";
import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import {
  CurrencyContext,
  CustomerRecoveredPassword,
  CustomerAuthContext,
} from "../store/store";
import rates from "../utils/rate";
import { useShopValue } from "../context/ShopProvider";
import ClientLogin from "./ClientLogin";
import ClientSignUp from "./ClientSignUp";
import ResetPassord from "./ResetPassword";
import { useRouter } from "next/router";

const Navbar = () => {
  const [{ basket }, dispatch] = useShopValue();
  const [mobileNav, setMobileNav] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openForget, setOpenForget] = useState(false);
  const overlayRef = useRef();
  const currencyRef = useRef();
  const authRef = useRef();
  const toggleBtnRef = useRef();
  const ref = useRef(null);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { passReset } = useContext(CustomerRecoveredPassword);
  const { customerAuth } = useContext(CustomerAuthContext);
  const currencies = ["cad", "dkk", "eur", "gbp", "nok", "nzd", "sek", "usd"];
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target) &&
        !authRef.current?.contains(event.target)
      ) {
        closeMobileNav();
      }
    }

    if (window.innerWidth < 1000) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleBtnRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target) &&
        !authRef.current?.contains(event.target)
      ) {
        setCurrencyOpen(false);
        currencyRef.current.style.display = "none";
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currencyRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (authRef.current && !authRef.current.contains(event.target)) {
        setOpenLogin(false);
        setOpenSignUp(false);
        setOpenForget(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [authRef]);

  useEffect(() => {
    if (passReset) {
      router.events.on("routeChangeComplete", (url) => {
        setTimeout(() => {
          handleLoginOpen();
        }, 2000);
        handleLoginOpen();
      });
    }
  }, [passReset, router]);

  const openMobileNav = () => {
    overlayRef.current.style.display = "block";
    document.body.setAttribute("no-scroll", true);
    toggleBtnRef.current.style.display = "flex";
    setMobileNav(true);
  };

  const closeMobileNav = () => {
    setMobileNav(false);
    toggleBtnRef.current.style.display = "none";
    document.body.setAttribute("no-scroll", false);
    overlayRef.current.style.display = "none";
  };

  const toggleCurrency = () => {
    if (currencyOpen == false) {
      setCurrencyOpen(true);
      currencyRef.current.style.display = "flex";
    } else {
      setCurrencyOpen(false);
      currencyRef.current.style.display = "none";
    }
  };

  const selectCurrency = (curr) => {
    setCurrencyOpen(false);
    currencyRef.current.style.display = "none";
    setCurrency({ curr, rate: rates[curr] });
  };

  const calCartItems = (cart) => {
    return cart?.reduce((prev, current) => current?.count + prev, 0);
  };

  const handleLoginOpen = () => {
    setOpenLogin(true);
    document.body.setAttribute("no-scroll", true);
  };

  const handleSignUpOpen = () => {
    setOpenLogin(false);
    setOpenSignUp(true);
    document.body.setAttribute("no-scroll", true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
    document.body.setAttribute("no-scroll", false);
  };

  const handleSignUpClose = () => {
    setOpenSignUp(false);
    document.body.setAttribute("no-scroll", false);
  };

  const handleForgetOpen = () => {
    setOpenLogin(false);
    setOpenForget(true);
    document.body.setAttribute("no-scroll", true);
  };

  const handleForgetClose = () => {
    setOpenForget(false);
    document.body.setAttribute("no-scroll", false);
  };


  return (
    <div className={styles.navbar__wrapper} ref={ref}>
      <div ref={overlayRef} className={styles.overlay}></div>
      <div className="global__container">
        {(openLogin || openSignUp || openForget) && (
          <div ref={authRef} className={styles.client__login__wrapper}>
            {openLogin && (
              <ClientLogin
                handleLoginClose={handleLoginClose}
                handleSignUpOpen={handleSignUpOpen}
                handleForgetOpen={handleForgetOpen}
              />
            )}

            {openSignUp && (
              <ClientSignUp
                handleSignUpClose={handleSignUpClose}
                handleLoginOpen={handleLoginOpen}
              />
            )}

            {openForget && (
              <ResetPassord
                handleForgetClose={handleForgetClose}
                handleSignUpOpen={handleSignUpOpen}
              />
            )}
          </div>
        )}

        <div className={styles.navbar__container}>
          <div className={styles.navbar__top}>
            <Link href={"/"}>
              <div className={styles.navbar__left}>
                <h2>GP</h2>
                <svg className={styles.navbar__icon__moon}>
                  <use xlinkHref="/svg/half-moon.svg#half-moon"></use>
                </svg>
                <h2>HEST</h2>
              </div>
            </Link>
            <div className={styles.navbar__right}>
              <div className={styles.navbar__right__top}>
                <ul className={styles.navbar__right__top__wrapper}>
                  <Link href={"/checkout"}>
                    <li className={styles.navbar__cart__wrapper}>
                      <div className={styles.navbar__cart__no}>
                        {calCartItems(basket)}
                      </div>
                      <svg className={styles.navbar__cart__icon}>
                        <use xlinkHref="/svg/shopping-cart.svg#shopping-cart"></use>
                      </svg>
                    </li>
                  </Link>
                </ul>

                <ul className={styles.navbar__menu__wrapper}>
                  {mobileNav ? (
                    <li
                      className={styles.navbar__close}
                      onClick={closeMobileNav}
                    >
                      <svg className={styles.navbar__icon}>
                        <use xlinkHref="/svg/close-sharp.svg#close-sharp"></use>
                      </svg>
                    </li>
                  ) : (
                    <li onClick={openMobileNav}>
                      <svg className={styles.navbar__menu__icon}>
                        <use xlinkHref="/svg/menu.svg#menu"></use>
                      </svg>
                    </li>
                  )}
                </ul>
              </div>
              <div className={styles.navbar__right__btm}>
                <ul className={styles.navbar__right__btm__wrapper}>
                  <li className={styles.navbar__right__blog}>
                    {customerAuth ? (
                      <p>
                        Hi{" "}
                        <span className={styles.navbar__email}>
                          {customerAuth.username}
                        </span>
                      </p>
                    ) : (
                      <span onClick={handleLoginOpen}>Sign In</span>
                    )}
                  </li>
                  <Link href={"/posts"}>
                    <li className={styles.navbar__right__blog}>blog</li>
                  </Link>
                  <li className={styles.navbar__currency__wrapper}>
                    <span onClick={toggleCurrency} className={styles.currency}>
                      {currency.curr}
                    </span>
                    <svg
                      onClick={toggleCurrency}
                      className={styles.navbar__currency}
                    >
                      <use xlinkHref="/svg/arrow-down.svg#arrow-down"></use>
                    </svg>
                    <ul
                      ref={currencyRef}
                      className={styles.navbar__currency__list}
                    >
                      {currencies.map((curr, idx) => (
                        <li key={idx} onClick={() => selectCurrency(curr)}>
                          {curr}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div ref={toggleBtnRef} className={styles.navbar__btm}>
            <ul className={styles.navbar__btm__list}>
              <Link href={"/buy-golds"}>
                <li>buy rs3 golds</li>
              </Link>
              <Link href={"/buy-golds"}>
                <li>buy osrs golds</li>
              </Link>
              <Link href={"/sell-golds"}>
                <li>sell rs3 golds</li>
              </Link>
              <Link href={"/sell-golds"}>
                <li>sell osrs golds</li>
              </Link>
              <Link href={"/accounts"}>
                <li>buy osrs accounts</li>
              </Link>
              <Link href={"/orders"}>
                <li>orders</li>
              </Link>
              <Link href={"/reviews"}>
                <li>feedback</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
