import styles from "../../../styles/GoldPrice.module.css";
import NavbarAd from "../../../components/NavbarAd";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import GoldPriceComponent from "../../../components/GoldPriceComponent";
import { useRef, useEffect } from "react";
import { getGoldPrices } from "../../../client/requests";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function GoldPrice({ goldPrices }) {
  const menuRef = useRef();
  const navbarRef = useRef();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/admin");
  }, [status]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        menuRef.current.style.visibility = "visible";
        navbarRef.current.style.display = "none";
      }
    }

    if (window.innerWidth < 871) {
      document.addEventListener("mousedown", handleClickOutside);

      // This is how you write code when component Unmounts...like exiting the website, this following return block runs.
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [navbarRef]);

  const adminNavToggle = () => {
    menuRef.current.style.visibility = "hidden";
    navbarRef.current.style.display = "block";
  };

  return (
    <div style={{ background: "#fff" }} className={styles.gold__prices}>
      <Navbar />
      <div className="global__container">
        <div className="admin__wrapper">
          <svg
            onClick={adminNavToggle}
            ref={menuRef}
            className="admin__menu__icon"
          >
            <use xlinkHref="/svg/menu.svg#menu"></use>
          </svg>

          <div ref={navbarRef} className="admin__navbar">
            <NavbarAd />
          </div>
          <div className="component__wrapper">
            <div className={styles.gold__prices__wrapper}>
              <Link href={"/admin/gold/create"}>
                <button className={styles.gold__prices__btn}>
                  Add Gold Price
                </button>
              </Link>
              <GoldPriceComponent goldPrices={goldPrices} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const { data } = await getGoldPrices();
  return {
    props: {
      goldPrices: data,
    },
  };
}
